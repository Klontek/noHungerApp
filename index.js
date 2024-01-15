import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

import categoryRoutes from "./routes/categories.js";
import connectDb from "./utility/connectDb.js";
import authJwt from "./helpers/jwt.js";
import ErrorHandler from "./helpers/error-handler.js";

import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import shopDataRoutes from "./routes/shopDatas.js";
import productDataRoutes from "./routes/productData.js";
import { isAuthorize } from "./middleware/validation/authMiddleware.mjs";
import { getProfile, signOut, uploadProfile } from "./controllers/users.js";

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
  "Access-Control-Allow-Origin": true,
  optionSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());

//middleWares
app.use(express.json());
app.use(morgan("tiny")); //terminal
app.use(ErrorHandler);

//middleware for serving static files: to enable files/images upload in gallery section after excluding it from jwt.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(authJwt()); //authorization middleware

dotenv.config();
connectDb();
const api = process.env.API;

app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/users`, isAuthorize, userRoutes);
app.use(`${api}/orders`, orderRoutes);
app.use(`${api}/shopDatas`, shopDataRoutes);
app.use(`${api}/productDatas`, productDataRoutes);
app.use(`${api}/upload-profile`, uploadProfile);
app.use(`${api}/sign-out`, isAuthorize, signOut);
// app.use(`${api}/profile`, isAuthorize, getProfile);
// app.use(`${api}/upload-profile`, isAuthorize, uploadProfile);

app.get("/", (req, res) => {
  res.send("Welcome to Restful API!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    msg: "Internal Server Error",
    error: err.message,
  });
});

app.listen(port, (err) => {
  if (err) throw new Error("Error while connecting to Server");
  console.log(`server is live and running at http://localhost:${port}`);
});

export default app;
