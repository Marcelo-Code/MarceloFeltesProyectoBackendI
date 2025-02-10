import {
  cartsFileManagerRead,
  cartsFileManagerWrite,
} from "../utils/fileUtils.js";

class cartManager {
  constructor() {}

  //Método para crear carrito

  async createCart() {
    const carts = await cartsFileManagerRead();
    const newCart = {
      id: carts.length + 1,
      products: [],
    };
    carts.push(newCart);
    await cartsFileManagerWrite(carts);
    return newCart;
  }

  //Método para obtener carrito

  async getCart(id) {
    const carts = await cartsFileManagerRead();
    const cart = carts.find((cart) => cart.id === id);
    if (!cart) return null;
    return cart;
  }

  //Método para obtener todos los carritos

  async getAllCarts() {
    const carts = await cartsFileManagerRead();
    return carts;
  }

  //Método para actualizar carrito, cuando se agrega un producto

  async updateCart(idCart, idProduct) {
    const carts = await cartsFileManagerRead();
    const cart = carts.find((cart) => cart.id === idCart);
    const existingProduct = cart.products.find(
      (product) => product.id === idProduct
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ id: idProduct, quantity: 1 });
    }
    await cartsFileManagerWrite(carts);
    return cart;
  }

  //Método para eliminar carrito

  async deleteCart(id) {
    const carts = await cartsFileManagerRead();
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex === -1) return null;
    const deletedCart = carts.splice(cartIndex, 1)[0];
    await cartsFileManagerWrite(carts);
    return deletedCart;
  }
}

export default cartManager;
