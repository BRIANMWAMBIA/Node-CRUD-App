const http = require("http");
const products = require("./data/products.json");
const {
  getAllProducts,
  getProductById,
  addNew,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
// setting up the server
http
  .createServer((req, res) => {
    //all the products
    if (req.url === "/api/products" && req.method === "GET") {
      getAllProducts(req, res);
    }
    //single product
    else if (
      req.url.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      getProductById(req, res, id);
    }
    //create a product
    else if (req.url === "/api/products" && req.method === "POST") {
      addNew(req, res);
    }
    //update an existing product
    else if (
      req.url.match(/\/api\/products\/([0-9])+/) &&
      req.method === "PUT"
    ) {
      const id = req.url.split("/")[3];
      updateProduct(req, res, id);
    }
    //delete a product
    else if (
      req.url.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      deleteProduct(req, res, id);
    }
    //invalid route
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "route not found" }));
    }
  })
  .listen(PORT, () => {
    console.log(`Server listening on localhost port ${PORT}`);
  });
