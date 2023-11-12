const express = require("express"); /* 
const UsersMySQL = require("../models/userSchemaMYSQL"); */
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

// FEATURES
const subQuotaStandard = 50;
const subQuotaPro = 500;

const endpointSecret =
  "whsec_75c53bb0865661be290dbf2ea4491e81aa0bdf973bbc92fa376b313bc0ec0a8d";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook Verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
