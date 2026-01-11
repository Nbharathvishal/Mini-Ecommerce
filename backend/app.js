const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");

dotenv.config();

app.use(express.json());
app.use(cors());

const products = require("./routes/product");
const orders = require("./routes/order");

const connectDatabase = require("./config/database");
connectDatabase();

app.use("/api/v1", products);
app.use("/api/v1", orders);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    }`
  );
});
