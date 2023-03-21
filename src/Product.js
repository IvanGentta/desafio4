import crypto from "crypto";
const mySalt =
  "XgS7UCA7rP74X4YSNwKqR1+YMvzzAL0sPih1RDDbURqupp+AZAX+SQqZ2x7RwoKvaexL7OIAgdWgZUBvAirINgE9tgrCG9uEBS+YTllCQ+LUSWBOSYm/A7U/cuNMxhX/n4eNbH++nILnks5QnwBdATwKFVAm2gaIDWv3nZiDxP8=";

export function encryptID(id) {
  const newID = encrypt(`${id}`, mySalt);
  return newID;
}

export function encrypt(unencrypted, salt) {
  const encrypted = crypto
    .createHmac("sha256", salt)
    .update(unencrypted)
    .digest("hex");
  return encrypted;
}

export class Products {
  constructor(
    lastID,
    { title, description, code, price, status = true, stock = 0, thumbnail }
  ) {
    this.ref = lastID;
    this.id = encryptID(lastID);
    this.title = title;
    this.description = description;
    this.price = price;
    this.status = status;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.code = code ?? `code-${this.lastID}`;
  }
}
