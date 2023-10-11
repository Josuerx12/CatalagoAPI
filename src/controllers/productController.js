const ProductService = require("../services/productService");
class ProductController {
  constructor() {
    this.product = new ProductService();
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addPhotoToProduct = this.addPhotoToProduct.bind(this);
    this.deleteProductPhoto = this.deleteProductPhoto.bind(this);
  }

  async createProduct(req, res) {
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
          message: "Fail to create the new product, try again latter.",
        },
      });
    }
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await this.product.delete(id);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: "Product deleted with success.",
          product,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          message: error.message,
        },
      });
    }
  }
  async editProduct(req, res) {
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
          message: error.message,
        },
      });
    }
  }
  async getProducts(req, res) {
    try {
      const products = await this.product.get();
      return res.status(201).json({
        payload: {
          status: "Success",
          products,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          message: `Fail to get the products.`,
        },
      });
    }
  }
  async getProduct(req, res) {
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
          message: error.message,
        },
      });
    }
  }
  async addPhotoToProduct(req, res) {
    try {
      const product = await this.product.addPhoto(req.params, req.files);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: `Photo(s) added with success to the product id: ${productId}`,
          product,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          message: error.message,
        },
      });
    }
  }
  async deleteProductPhoto(req, res) {
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
          message: error.message,
        },
      });
    }
  }
}

module.exports = ProductController;
