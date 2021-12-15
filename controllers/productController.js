const { stringify } = require("uuid");
const Products = require("../models/productModel");
const { getBodyData } = require("../models/utill");

//@desc get one product
//@route GET: /api/products
async function getAllProducts(req, res) {
  try {
    const products = await Products.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}
//@desc get one product
//@route GET: /api/products/:id
async function getProductById(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}
//@desc add new product
//@route  POST: /api/products
async function addNew(req, res) {
  try {
    const body = await getBodyData(req, res);
    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };
    const createdProduct = await Products.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(createdProduct));
  } catch (error) {}
}
//@desc update existing product
//@route  PUT: /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(stringify({ message: "product not found" }));
    } else {
      const body = await getBodyData(req);
      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updatedProduct = await Products.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}
//@desc delete product
//@route  DELETE: /api/products/:id
async function deleteProduct(req, res, id) {
  const product = Products.findById(id);
  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "product not found" }));
  } else {
    await Products.remove(id);
    res.writeHead(200, { "Content-Type": "applicaton/json" });
    res.end(JSON.stringify({ message: `product id ${id} removed` }));
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  addNew,
  updateProduct,
  deleteProduct,
};
