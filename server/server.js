const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ApnaBazaar Backend Running");
});
app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Amul Milk",
      price: 35,
    },
    {
      id: 2,
      name: "Bread",
      price: 25,
    },
   {
  id: 3,
  name: "Organic Eggs",
  price: 90
},
{
  id: 4,
  name: "Mangoes",
  price: 150
}
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});