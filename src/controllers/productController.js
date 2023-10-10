const ProductService = require("../services/productService");
class ProductController {
  constructor() {
    this.product = new ProductService();
    this.createProduct = this.createProduct.bind(this);
  }

  async createProduct(req, res) {
    try {
      const ress = await this.product.newProduct(req.body, req.files);
      console.log(ress);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: "Teste",
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          message: "Try again latter.",
        },
      });
    }
  }
}

module.exports = ProductController;
