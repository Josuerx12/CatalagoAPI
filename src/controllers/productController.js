const ProductService = require("../services/productService");
class ProductController {
  constructor() {
    this.product = new ProductService();
  }

  createProduct = async (req, res) => {
    try {
      const product = await this.product.new(req.body, req.files);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: "Product created with success.",
          product,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: "Fail to create the new product, try again latter." },
        },
      });
    }
  };
  deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await this.product.delete(id);
      return res.status(201).json({
        payload: {
          status: "Success",
          errors: { msg: "Product deleted with success." },
          product,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: error.message },
        },
      });
    }
  };
  editProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await this.product.edit(id, req.body, req.files);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: "Product edited with success.",
          product,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: error.message },
        },
      });
    }
  };
  getProducts = async (req, res) => {
    try {
      const products = await this.product.get(req.query);
      return res.status(201).json({ payload: products });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: `Fail to get the products.` },
        },
      });
    }
  };
  getProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await this.product.getById(id);
      return res.status(201).json({
        payload: {
          status: "Success",
          product,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: error.message },
        },
      });
    }
  };
  deleteProductPhoto = async (req, res) => {
    const { productId, photoId } = req.params;

    try {
      const product = await this.product.deletePhotoById(productId, photoId);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: `Photo id:${photoId} was deleted from the product id: ${productId}`,
          product,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: error.message },
        },
      });
    }
  };
}

module.exports = ProductController;
