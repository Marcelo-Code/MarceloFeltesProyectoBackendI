import { Router } from "express";
import cartManager from "../classes/cartManager.js";
import productManager from "../classes/productManager.js";

const router = Router();

const cart = new cartManager();
const product = new productManager();

//Endpoint para obtener carritos

router.get("/", async (req, res) => {
  try {
    const carts = await cart.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener carritos", details: error.message });
  }
});

//Endpoint para obtener un carrito

router.get("/:cid", async (req, res) => {
  try {
    const id = parseInt(req.params.cid);
    const foundCart = await cart.getCart(id);
    if (!foundCart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.status(200).json(foundCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar carrito", details: error.message });
  }
});

//Endpoint para crear un carrito

router.post("/", async (req, res) => {
  try {
    const newCart = await cart.createCart();
    res.status(201).json({ message: "Carrito creado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear carrito", details: error.message });
  }
});

//Endpoint para actualizar un carrito (cargar productos)

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const foundCart = await cart.getCart(cartId);
    const foundProduct = await product.getProduct(productId);
    if (!foundCart || !foundProduct)
      return res
        .status(404)
        .json({ message: "Producto o carrito no encontrado" });
    const updatedCart = await cart.updateCart(cartId, productId);
    res.status(200).json({ message: "Carrito actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar producto a carrito",
      details: error.message,
    });
  }
});

//Endpoint para eliminar un carrito

router.delete("/:cid", async (req, res) => {
  try {
    const id = parseInt(req.params.cid);
    const deletedCart = await cart.deleteCart(id);
    console.log(deletedCart);
    if (!deletedCart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.status(200).json({ message: "Carrito eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar carrito", details: error.message });
  }
});

export default router;
