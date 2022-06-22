import 'dotenv/config'
import express from "express";
import cors from "cors";
import * as dbo from "./connection.js";
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/api/inventory/getAllInventory", (req, res) => {
    const db = dbo.getDb();
    db.collection(process.env.DB_COLLECTION)
        .find().limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching inventory");
            } else {
                // res.json({ metaData: { count: result.length}, results: result});
                res.json(result);
            }
        });
});


// Retrieve
app.get("/api/inventory/:productId", (req, res) => {
    const db = dbo.getDb();
    db.collection(process.env.DB_COLLECTION)
        .find({"productId": req.params.productId}).limit(1)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching inventory");
            } else {
                // res.json({ metaData: { count: result.length}, results: result});
                res.json(result[0]);
            }
        });
});

// Create
app.post("/api/inventory", (req, res) => {
  const dbConnect = dbo.getDb();
  const inventoryId = `INV-${Date.now()}`
  const inventoryPayload = {...req.body, inventoryId};

  dbConnect
      .collection(process.env.DB_COLLECTION)
      .insertOne(inventoryPayload, (err, result) => {
        if (err) {
          res.status(400).send({status: "Error adding an item to the inventory"});
        }
        console.log(`Added an item with id: ${result.insertedId}`);
        res.status(202).send({status: "ITEM_ADDED"});
      });

});

// Update
app.put("/api/inventory/:productNumber", (req, res) => {
  res.send("Update an order");
});

const PORT = 3002;

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
