import 'dotenv/config'
import express from "express";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Retrieve
app.get("/inventory/:productNumber", (req, res) => {
  res.send("Get an order by orderNumber");
});

// Create
app.post("/inventory", (req, res) => {
  res.send("Create a new order");
});

// Update
app.put("/inventory/:productNumber", (req, res) => {
  res.send("Update an order");
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
