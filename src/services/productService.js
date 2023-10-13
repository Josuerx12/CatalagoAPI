const mongoose = require("mongoose");
const ProductModel = require("../models/productsModel");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../utils/s3Auth");

class ProductService {
  async new(details, photos) {
    const { name, category, stock, unit, value, description } = details;
    if (photos) {
      const photosArray = photos.map((photo) => ({ photo: photo.key }));
      const product = await ProductModel.create({
        name,
        category,
        stock,
        unit,
        photos: photosArray,
        value,
        description,
      });
      return product;
    }
    const product = await ProductModel.create({
      name,
      category,
      stock,
      unit,
      value,
      description,
    });
    return product;
  }
  async get() {
    const products = await ProductModel.find();

    return products;
  }
  async getById(id) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error(`Product id: ${id} not found!`);
    }
    return product;
  }
  async edit(id, details, photos) {
    if (!photos && !details) {
      throw new Error("No data inserted.");
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error(`Product id: ${id} not found!`);
    }
    const { name, category, stock, unit, value, description } = details;

    if (name) product.name = name;

    if (category) product.category = category;

    if (stock) product.stock = stock;

    if (unit) product.unit = unit;

    if (value) product.value = value;

    if (description) product.description = description;

    if (photos) {
      const photosArray = photos.map((photo) => ({ photo: photo.key }));
      product.photos = [...product.photos, ...photosArray];
    }

    await product.save();
    return product;
  }
  async delete(id) {
    if (!id) {
      throw new Error("This product id doens't exists.");
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      throw new Error(`Product id: ${id} not found!`);
    }

    const photos = product.photos.map((photo) => photo.photo);

    for (let i = 0; i < photos.length; i++) {
      const deleteOptions = {
        Bucket: "productphotoscatalogo",
        Key: photos[i],
      };
      const deleteCommand = new DeleteObjectCommand(deleteOptions);
      await s3.send(deleteCommand);
    }

    const productDeleted = await ProductModel.findByIdAndDelete(id);

    return productDeleted;
  }
  async deletePhotoById(productId, photoId) {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new Error(`Product id: ${id} not found!`);
    }

    if (!product.photos || product.photos.length <= 0) {
      throw new Error("Product photos is empty.");
    }

    const newPhotosArray = product.photos.filter(
      (photo) => photo._id.toString() !== photoId
    );

    const photo = product.photos.filter(
      (photo) => photoId === photo._id.toString()
    );

    if (newPhotosArray.length < 0) {
      product.photos = null;
    }

    product.photos = newPhotosArray;

    const deleteS3Options = {
      Bucket: "productphotoscatalogo",
      Key: photo[0].photo,
    };

    const deleteCommand = new DeleteObjectCommand(deleteS3Options);

    await s3.send(deleteCommand);

    await product.save();
    return product;
  }
}

module.exports = ProductService;
