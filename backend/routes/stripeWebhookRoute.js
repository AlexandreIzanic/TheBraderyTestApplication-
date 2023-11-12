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

    if (endpointSecret) {
      // Get the signature sent by Stripe
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

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.log(checkoutSessionCompleted);

        // Récupérez les informations nécessaires depuis l'événement
        const productId = checkoutSessionCompleted.client_reference_id;
        const addressDetails =
          checkoutSessionCompleted.shipping_details.address;

        const concatenatedAddress = `${addressDetails.line1}, ${addressDetails.city}, ${addressDetails.postal_code}, ${addressDetails.country}`;

        const amountTotal = checkoutSessionCompleted.amount_total / 100;
        const name = checkoutSessionCompleted.shipping_details.name;

        const insertOrderQuery = `
    INSERT INTO orders ( email, adresse, amount_total , date_creation )
    VALUES ('${checkoutSessionCompleted.customer_details.email}', '${concatenatedAddress}', '${amountTotal}' , NOW())
  `;

        try {
          await mysqlDB.connection.query(insertOrderQuery);
          console.log("Order added to the database");
        } catch (error) {
          console.error("Error adding order to the database:", error);
        }

        break;

      case "customer.subscription.created":
        const customerSubscriptionCreated = event.data.object;

        break;

      case "customer.subscription.deleted":
        const customerSubscriptionDeleted = event.data.object;

        break;
      case "customer.subscription.updated":
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
