import "dotenv/config";
import express from "express";
import prisma from "./src/db/prisma.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./src/routers/auth.router.js";
import productRouter from "./src/routers/product.router.js";
import cartRouter from "./src/routers/cart.router.js";
import orderRouter from "./src/routers/orderManagement.router.js";
import wishlistRouter from "./src/routers/wishList.router.js";
import paymentRouter from "./src/routers/payment.router.js"

const app = express();
app.use(cors(
    {
        origin: process.env.ORIGIN,
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());


const startServer = async()=>{
    try{
        await prisma.$connect();
        console.log("Connected to the DB");
        //Once the DB is connected now we will start our server

        const selectedPPORT =  process.env.PORT || 3000 ;

        app.listen(selectedPPORT, ()=>{
            console.log(`Server is up at port ${selectedPPORT} `)
        });

    }
    catch(err){
        console.error("DB connection failed!");
    }
};
startServer();


app.get("/", (req, res)=>{
    res.send({
        message:"Hello"
    })
});
app.use("/api/auth", authRouter);
app.use("/api/products" , productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/payment", paymentRouter);