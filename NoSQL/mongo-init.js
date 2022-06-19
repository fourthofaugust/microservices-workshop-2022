print(":::: Starting NoSQL Initialization ::::");

db = db.getSiblingDB("inventory_db");
db.createUser({
  user: "inventory_api_user",
  pwd: "api1234",
  roles: [{ role: "readWrite", db: "inventory_db" }],
});
db.createCollection("inventory");

db = db.getSiblingDB("orders_db");
db.createUser({
  user: "orders_api_user",
  pwd: "api1234",
  roles: [{ role: "readWrite", db: "orders_db" }],
});
db.createCollection("orders");

print(":::: End of NoSQL Initialization ::::");
