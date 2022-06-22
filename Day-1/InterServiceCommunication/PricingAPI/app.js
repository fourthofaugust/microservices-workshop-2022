import 'dotenv/config'
import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const prices = [
    {
        "productId": "ABC1234",
        "price": 24.0
    },
    {
        "productId": "ABC1235",
        "price": 14.0
    },
    {
        "productId": "ABC1236",
        "price": 12.0
    },
    {
        "productId": "ABC1239",
        "price": 300.0
    },
]

// Retrieve
app.get("/api/pricing/:productId", (req, res) => {
    let retVal;
    const productId = req.params.productId;
    retVal = prices.find(val => val.productId === productId || {});
    res.json(retVal)
});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
