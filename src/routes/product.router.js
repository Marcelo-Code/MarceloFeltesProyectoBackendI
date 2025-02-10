import { Router } from "express";
import productManager from "../classes/productManager.js";

const router = Router();
const product = new productManager();

//Endopoint para crear un producto

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, category, thumbnails } = req.body;

    //Asegura que se completen las propiedades obligatorias

    if (!title || !description || !code || !price || !category)
      res.status(400).json({ message: "Complete los campos obligatorios" });

    //En caso de un valor null o undefined status tomará el valor true

    const status = req.body.status ?? true;
    const newProduct = await product.createProduct(
      title,
      description,
      code,
      price,
      status ?? true,
      category,
      thumbnails || []
    );
    res
      .status(201)
      .json({ message: "Producto creado exitosamente", newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear producto", details: error.message });
  }
});

//Endpoint para actualizar un producto

router.put("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const { title, description, code, price, status, category, thumbnails } =
      req.body;
    const updatedProduct = await product.updateProduct(
      id,
      title,
      description,
      code,
      price,
      status,
      category,
      thumbnails
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });
    res
      .status(200)
      .json({ message: "Producto actualizado exitosamente", updatedProduct });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el producto: ",
      details: error.message,
    });
  }
});

//Endpoint apra obtener todos los productos

router.get("/", async (req, res) => {
  try {
    const masBaratoQue = Number(req.query.masBaratoQue);
    let products = await product.getAllProducts();
    if (!isNaN(masBaratoQue)) {
      products = products.filter((product) => product.price < masBaratoQue);
    }
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", details: error.message });
  }
});

//Método para obtener un producto

router.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const foundProduct = await product.getProduct(id);
    if (!foundProduct)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(foundProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar producto", details: error.message });
  }
});

//Endopoint para eliminar un producto

router.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const deletedProduct = await product.deleteProduct(id);
    console.log(deletedProduct);
    if (!deletedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el producto",
      details: error.message,
    });
  }
});

export default router;
