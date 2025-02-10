import {
  productsFileManagerRead,
  productsFileManagerWrite,
} from "../utils/fileUtils.js";

class productManager {
  constructor() {}

  //Método para crear producto

  async createProduct(
    title,
    description,
    code,
    price,
    status,
    category,
    thumbnails
  ) {
    const products = await productsFileManagerRead();
    const newProduct = {
      id: products.length + 1,
      title,
      description,
      code,
      price,
      status,
      category,
      thumbnails: [],
    };
    products.push(newProduct);
    await productsFileManagerWrite(products);
    return newProduct;
  }

  //Método para actualizar un producto

  async updateProduct(
    id,
    title,
    description,
    code,
    price,
    status,
    category,
    thumbnails
  ) {
    const products = await productsFileManagerRead();
    const product = products.find((product) => product.id === id);
    if (!product) return null;

    //Actualiza solamente las propiedades que se ingresan en el body

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.code = code ?? product.code;
    product.price = price ?? product.price;
    product.status = status ?? product.status;
    product.category = category ?? product.category;
    product.thumbnails = thumbnails ?? product.thumbnails;
    await productsFileManagerWrite(products);
    return product;
  }

  //Método para eliminar un producto

  async deleteProduct(id) {
    const products = await productsFileManagerRead();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) return null;
    const deletedProduct = products.splice(productIndex, 1)[0];
    await productsFileManagerWrite(products);
    return deletedProduct;
  }

  //Método para obtener todos los productos

  async getAllProducts() {
    const products = await productsFileManagerRead();
    return products;
  }

  //Método para obtener un producto

  async getProduct(id) {
    const products = await productsFileManagerRead();
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  }
}

export default productManager;
