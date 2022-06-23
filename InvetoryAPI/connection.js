import {MongoClient} from "mongodb";

const connectionString = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

export const connectToServer = (callback) => {
    client.connect(function (err, db) {
        if (err || !db) {
            return callback(err);
        }

        dbConnection = db.db("inventory_db");
        console.log("Successfully connected to Inventory MongoDB.");

        return callback();
    });
};

export const getDb = () => {
    return dbConnection;
}