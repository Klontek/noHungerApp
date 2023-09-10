import express from "express";
import cors from "cors";
import helmet from "helmet";
import categoryRoutes from "./routes/categories.js";
import dotenv from "dotenv";
import connectDb from "./utility/connectDb.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
 origin: "*",
 "Access-Control-Allow-Origin": true,
 optionSuccessStatus: 200
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('tiny'));

dotenv.config();
connectDb();

app.use('/categories', categoryRoutes)

app.get('/', (req, res) => {
 res.send("Welcome to Restful API!")
})

app.use((req, res, next) => {
 const error = new Error("Something went wrong");
 error.status = 404;
 next(error);
})


app.listen(port, (err) => {
 if(err) throw new Error("Error while connecting to Server");
 console.log(`server is live and running at http://localhost:${port}`)
})

export default app;