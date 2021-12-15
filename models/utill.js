const fs = require("fs");
//write products on the product.json file
function writeProductToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) =>
    console.log(err)
  );
}
//get the data froom the request body
function getBodyData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = { writeProductToFile, getBodyData };
