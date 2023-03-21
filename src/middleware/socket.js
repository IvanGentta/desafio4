import { io } from "../app.js";
import { PM } from "../ProductManager.js";

export async function socketHandle(req, res, next) {
  const products = await PM.getProducts();
  io.emit("updateList", {
    list: products,
    showList: products.length > 0,
  });
}
