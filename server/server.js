const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandlers");
const morgan = require("morgan");

dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
