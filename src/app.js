import express from "express";
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
