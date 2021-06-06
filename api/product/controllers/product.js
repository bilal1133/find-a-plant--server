"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    const model = strapi.models.product;
    if (ctx.query.specification) {
      let query = { ...ctx.query };
      // { specification: { pruning: '23' } }
      delete query.specification;

      let data = await strapi.query("product").find(query);
      let a = [];
      let keyToCompare = Object.keys(ctx.query.specification)[0];

      data = data.filter((single) => {
        return (
          single.specification[0][keyToCompare] ===
          ctx.query.specification[keyToCompare]
        );
      });
      if (!data.length) {
        const err = new Error();
        err.status = 404;
        throw err;
        return;
      } else return data;
      // data.forEach((single) => {
      //   return a.push(single.specification[0]);
      // });
      // return a;
    } else {
      return await strapi.query("product").find(ctx.query);
    }
  },

  async findOne(ctx) {
    try {
      const id = ctx.req._parsedUrl.pathname.split("/products/")[1];
      let data = await strapi.query("product").find({ _id: id });

      if (!data.length) {
        const err = new Error();
        err.status = 404;
        throw err;
        return;
      } else return data[0];

      // delete data.vendor.password;

      ctx.body = {
        data,
      };
    } catch (error) {}
  },
};
