const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

app.use(express.json()); 
app.use(cors());

const products = require("./routes/product");
const orders = require("./routes/order");

const connectDatabase = require("./config/database");
connectDatabase(); 

app.use(express.json())

app.use("/api/v1", products);
app.use("/api/v1", orders);

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
