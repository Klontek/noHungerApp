import { expressjwt } from "express-jwt";

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevokedFunction,
  }).unless({
    path: [
      {
        url: /^\/public\/uploads\/.*/,
        methods: ["GET", "OPTIONS"], //excluding gallery-images/:productId Api
      },
      {
        url: /\/api\/v1\/products(.*)/,
        methods: ["GET", "OPTIONS"],
      }, // to exclude product GET api as protected route
      {
        url: /\/api\/v1\/productDatas(.*)/,
        methods: ["GET", "OPTIONS"],
      }, // to exclude productData GET api as protected route
      {
        url: /\/api\/v1\/shopDatas(.*)/,
        methods: ["GET", "OPTIONS"],
      }, // to exclude productData GET api as protected route
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      `${api}/users/login`, //to exclude login api as protected route
      `${api}/users/register`, //to exclude signup api as protected route
    ],
  });
}

async function isRevokedFunction(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}

export default authJwt;
