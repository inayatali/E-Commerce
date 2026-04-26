const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id:1, name:"Shirt", price:1500 },
  { id:2, name:"Shoes", price:3000 }
];

// load orders from file
let orders = [];
if (fs.existsSync("orders.json")) {
  orders = JSON.parse(fs.readFileSync("orders.json"));
}

app.get("/products", (req,res)=> res.json(products));

app.get("/orders", (req,res)=> res.json(orders));

app.post("/orders", (req,res)=>{
  orders.push(req.body);
  fs.writeFileSync("orders.json", JSON.stringify(orders,null,2));
  res.json({message:"Order saved"});
});

app.listen(5000, ()=> console.log("Server running on port 5000"));
