const express = require("express");
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const endpointSecret =
  "whsec_9173d599a01ed84ce8f1373f594e0d1ac1d5aa9d982db7654aaadfe31153ccd0";
const mysqlDB = require("../config/connectToMySQL");

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event = req.body;
    // Signature Stripe
    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }
    }

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.log(checkoutSessionCompleted);

        const addressDetails =
          checkoutSessionCompleted.shipping_details.address;

        const concatenatedAddress = `${addressDetails.line1}, ${addressDetails.city}, ${addressDetails.postal_code}, ${addressDetails.country}`;

        // Prevent apostrophe error on SQL query
        const escapedAddress = concatenatedAddress.replace(/'/g, "''");

        const amountTotal = checkoutSessionCompleted.amount_total / 100;

        const session = await stripe.checkout.sessions.retrieve(
          checkoutSessionCompleted.id
        );

        const sessionDesc = session.metadata.metadataItem;

        // Update order created when checkout session created
        const insertOrderQuery = `UPDATE orders
SET email = '${checkoutSessionCompleted.customer_details.email}',
    adresse = '${escapedAddress}',
    amount_total = '${amountTotal}',
    order_desc = '${sessionDesc}'
WHERE stripe_session_id = '${checkoutSessionCompleted.id}';
  `;

        const idRegex = /ID: (\d+)/;
        const id1 = sessionDesc.match(idRegex)[1];
        console.log("id1");
        console.log(id1);

        try {
          await mysqlDB.connection.query(insertOrderQuery);
          console.log("Order added to the database");
        } catch (error) {
          console.error("Error adding order to the database:", error);
        }

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
