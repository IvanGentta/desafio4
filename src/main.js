import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

import { viewRouter } from "./routes/viewRouter.js";

import { socketHandle } from "./middleware/socket.js";

const PORT = 8080;

const app = express();
app.use("/static", express.static("./static"));

app.engine("handlebars", engine());
app.set("views", "./views");

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewRouter);
app.use(handleError);

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  console.log("Path to static view: ", "http://localhost:8080/");
  console.log(
    "Path to dinamic view: ",
    "http://localhost:8080/realtimeproducts”"
  );
});

export const io = new Server(server);

io.on("connection", async (clientSocket) => {
  console.log(`Nuevo cliente conectado: ${clientSocket.id}`);
  await socketHandle();
});
