const express = require("express");
const core = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db");
const userRoutes = require("./routes/auth.routes.js");
const productRoutes = require("./routes/product.routes.js");
const ordersRoutes = require("./routes/order.routes.js");
// const paymentRoutes = require("./routes/payment.routes.js");
// const analyticsRoutes = require("./routes/analytics.routes.js");

const app = express();
app.use(core());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("FirstCart backend is working properly!");
});

const PORT = process.env.PORT || 3000;

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/analytics", analyticsRoutes);

dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
