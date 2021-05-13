"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(process.env.stripeKey);

module.exports = {
  stripePayment: async (ctx) => {
    let { amount, currency = "pkr" } = ctx.request.body;
    if (!amount) {
      ctx.throw(400, "No Amount was Set");
    }

    ctx.send({ amount, currency, body: ctx.request.body });
    try {
      amount = amount * 100;
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
      ctx.send({
        paymentIntent,
      });
    } catch (error) {
      console.log(error);
      ctx.throw(400, "No Amount was Set");
    }
  },
};

// module.exports = {
//     // GET /hello
//     index: async ctx => {
//       ctx.send('Hello World!');
//     },
//   };
