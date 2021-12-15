let products = require("../data/products");
const { v4: uuidv4 } = require("uuid");

const { writeProductToFile } = require("./utill");
//retrieve all the products on products.json
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}
//get one product from the products.json file
function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((data) => data.id == id);
    resolve(product);
  });
}
//create a new product on products.json
function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeProductToFile("./data/products.json", products);
    resolve(newProduct);
  });
}
//update an existing product on the products.json
function update(id, productData) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...productData };
    writeProductToFile("./data/products.json", products);
    resolve(products[index]);
  });
}
//deletes a product from the products.json
function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeProductToFile("./data/products.json", products);
    resolve();
  });
}
module.exports = { findAll, findById, create, update, remove };
