import 'dotenv/config'
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Retrieve
app.get("/api/om-bff/:productId", async (req, res) => {

    const productId = req.params.productId;
    let invRes = await fetch(process.env.INV_API + productId);
    const invData = await invRes.json();

    let pricingRes = await fetch(process.env.PRICING_API + productId);
    const pricingData = await pricingRes.json();

    const finalResponse = {...invData, price: pricingData.price}

    res.json(finalResponse)
});

const PORT = 3004;

app.listen(Number(process.env.PORT), () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
