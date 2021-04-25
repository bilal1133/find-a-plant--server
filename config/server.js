module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Added by Bilal
  url: "http://localhost:1337",
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '95e5408e5115bcec158a1721747e993a'),
    },
  },
});
