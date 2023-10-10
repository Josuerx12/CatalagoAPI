const ProductModel = require("../models/productsModel");
class ProductService {
  async newProduct(product, photos) {
    const { name, category, stock, unit, value, description } = product;
    if (photos) {
      const photosArray = photos.map((photo) => ({ key: photo.key }));
      const res = await ProductModel.create({
        name,
        category,
        stock,
        unit,
        photos: photosArray,
        value,
        description,
      });
      return res;
    }
    const res = await ProductModel.create({
      name,
      category,
      stock,
      unit,
      value,
      description,
    });
    return res;
  }
}

module.exports = ProductService;
