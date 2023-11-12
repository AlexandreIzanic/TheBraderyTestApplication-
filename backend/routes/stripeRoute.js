const express = require("express");
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const mysqlDB = require("../config/connectToMySQL");

const YOUR_DOMAIN = "http://localhost:3001";

router.post("/create-checkout-session", async (req, res) => {
  try {
    // Items from cartItems Front
    const metadataItem = req.body.cartItems
      // Transform Object into String for each Item
      .map((item) => {
        return `ID: ${item.id}, Name: ${item.name}, Price: ${item.price.toFixed(
          2
        )}, Quantity: ${item.quantity}`;
      })
      .join("\n");

    // Retrieve Items data for checkout
    const line_items = req.body.cartItems.map((item) => {
      // Prevent Error Invalid Integer Stripe
      const itemPrice = (item.price * 100).toFixed(0);
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,

            metadata: {
              id: item.id,
              quantity: item.quantity,
            },
          },
          unit_amount: itemPrice,
        },
        quantity: item.quantity,
      };
    });

    // Create Session with cartItems data
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success/`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      custom_text: {
        shipping_address: {
          message:
            "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
        },
        submit: {
          message: "We'll email you instructions on how to get started.",
        },
      },
      metadata: {
        metadataItem: metadataItem,
      },
    });

    // Save session ID
    const insertQuery = "INSERT INTO orders (stripe_session_id) VALUES (?)";

    mysqlDB.connection.query(insertQuery, [session.id], (error, results) => {
      if (error) {
        console.error("Error inserting session ID into MySQL:", error);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Session ID inserted into MySQL:", session.id);
      console.log("MySQL Insert Results:", results);

      res.json({ url: session.url });
    });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
