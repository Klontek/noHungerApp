import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";


import categoryRoutes from "./routes/categories.js";
import connectDb from "./utility/connectDb.js";import authJwt from "./helpers/jwt.js";
import ErrorHandler from "./helpers/error-handler.js";

import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js"





const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
 origin: "*",
 "Access-Control-Allow-Origin": true,
 optionSuccessStatus: 200
}

app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(helmet());

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(ErrorHandler);

dotenv.config();
connectDb();
const api = process.env.API




app.use(`${api}/products`, productRoutes)
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`, orderRoutes);




app.get('/', (req, res) => {
 res.send("Welcome to Restful API!")
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    msg: "Internal Server Error",
    error: err.message
  });
});


app.listen(port, (err) => {
 if(err) throw new Error("Error while connecting to Server");
 console.log(`server is live and running at http://localhost:${port}`)
})

export default app;