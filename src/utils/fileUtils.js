import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtiene el directorio de la ruta del archivo
const __dirname = path.dirname(__filename);

// Obtiene la ruta de cart.json
const cartFilePath = path.resolve(__dirname, "../data/cart.json");

//Obtiene la ruta de product.json
const productFilePath = path.resolve(__dirname, "../data/product.json");

//Función para escribir archivo cart.json

export const cartsFileManagerWrite = async (carts) => {
  try {
    const jsonData = JSON.stringify(carts, null, 2);
    await fs.writeFile(cartFilePath, jsonData, "utf-8");
    console.log("Archivo escrito correctamente:", cartFilePath);
  } catch (error) {
    console.error("Error al escribir el archivo:", error);
  }
};

//Función para leer archivo cart.json

export const cartsFileManagerRead = async () => {
  try {
    const data = await fs.readFile(cartFilePath, "utf-8");
    const carts = JSON.parse(data); // Parsear el contenido del archivo JSON
    console.log("Archivo leído correctamente:", carts);
    return carts;
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return null;
  }
};

//Función para escribir archivo product.json

export const productsFileManagerWrite = async (products) => {
  try {
    const jsonData = JSON.stringify(products, null, 2);
    await fs.writeFile(productFilePath, jsonData, "utf-8");
    console.log("Archivo escrito correctamente:", productFilePath);
  } catch (error) {
    console.error("Error al escribir el archivo:", error);
  }
};

//Función para leer archivo product.json

export const productsFileManagerRead = async () => {
  try {
    const data = await fs.readFile(productFilePath, "utf-8");
    const products = JSON.parse(data); // Parsear el contenido del archivo JSON
    console.log("Archivo leído correctamente:", products);
    return products;
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return null;
  }
};
