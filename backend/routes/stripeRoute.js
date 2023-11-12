const express = require("express");
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const mysqlDB = require("../config/connectToMySQL");

var getRawBody = require("raw-body");
const YOUR_DOMAIN = "http://localhost:3001";

const endpointSecret =
  "whsec_9173d599a01ed84ce8f1373f594e0d1ac1d5aa9d982db7654aaadfe31153ccd0";

router.post("/test", async (req, res) => {
  test = req.body.cartItems;
  res.json(test);
});

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const line_items = req.body.cartItems.map((item) => {
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
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const metadataItem = req.body.cartItems.map((item) => {
    item.name;
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
    shipping_address_collection: {
      allowed_countries: ["FR"],
    },
    metadata: metadataItem,

    custom_text: {
      shipping_address: {
        message:
          "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
      },
      submit: {
        message: "We'll email you instructions on how to get started.",
      },
    },
  });

  res.json({ url: session.url });
});

module.exports = router;
