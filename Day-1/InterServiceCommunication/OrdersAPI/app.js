import 'dotenv/config';
import express from "express";
import cors from "cors";
import * as dbo from "./connection.js";
import {ServiceBusClient} from "@azure/service-bus";

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Retrieve
app.get("/api/orders/:orderNumber", (req, res) => {
    const db = dbo.getDb();
    db.collection(process.env.DB_COLLECTION)
        .find({'header.orderNumber': req.params.orderNumber}).limit(1)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching order details");
            } else {
                // res.json({ metaData: { count: result.length}, results: result});
                res.json(result);
            }
        });
});

app.get("/api/orders/stores/:storeId", (req, res) => {
    const db = dbo.getDb();
    db.collection(process.env.DB_COLLECTION)
        .find({'header.storeId': req.params.storeId}).limit(100)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching order details");
            } else {
                // res.json({ metaData: { count: result.length}, results: result});
                res.json(result);
            }
        });
});

// Create
app.post("/api/orders", (req, res) => {
    const dbConnect = dbo.getDb();
    const orderNumber = `ORD-${Date.now()}`
    const orderPayload = {
        header: {...req.body.header, orderNumber, status: process.env.ORDER_STATUS_RECEIVED},
        lineItems: req.body.lineItems,
    };

    dbConnect
        .collection(process.env.DB_COLLECTION)
        .insertOne(orderPayload, (err, result) => {
            if (err) {
                res.status(400).send({status: "Error submitting an order"});
            }
            console.log(`Submitted an order with id: ${result.insertedId}`);
            res.status(202).send({status: "ORDER_RECEIVED"});
        });
});

// Update
app.put("/api/orders/:orderNumber", (req, res) => {
    const dbConnect = dbo.getDb();
    const listingQuery = {'header.orderNumber': req.params.orderNumber};
    const updates = {
        $set: {
            'header.status' : req.body.status
        }
    };

    dbConnect
        .collection(process.env.DB_COLLECTION)
        .updateOne(listingQuery, updates, function (err, _result) {
            if (err) {
                res.status(400).send({status: `Error updating Order# ${req.params.orderNumber}.`});
            } else {
                res.status(200).send({status: `Order# ${req.params.orderNumber} has been updated.`})
            }
        });
});

dbo.connectToServer(function (err) {
    if (err) {
        console.error(`Error setting up DB connection :: ${err}`);
        process.exit();
    }
    // start the Express server
    app.listen(Number(process.env.PORT), () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
});
