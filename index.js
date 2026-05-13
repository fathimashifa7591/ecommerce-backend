import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

app.use(
  cors({
    origin: "https://ecommerce-frontend-ten-virid.vercel.app",
  })
);

//test route
app.get("/", (req,res)=> {
    res.send("API is working");
});

app.use("/", productRoutes);

mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("DB connected"))
   .catch((err )=> console.log(err));

app.listen(PORT, ()=> {
    console.log("server running on port 5000");
});