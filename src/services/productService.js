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
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error(`Product id: ${id} not found!`);
    }
    const { name, category, stock, unit, value, description } = details;

    if (name) {
      product.name = name;
    } else if (category) {
      product.category = category;
    } else if (stock) {
      product.stock = stock;
    } else if (unit) {
      product.unit = unit;
    } else if (value) {
      product.value = value;
    } else if (description) {
      product.description = description;
    }

    if (photos) {
      const photosArray = photos.map((photo) => ({ photo: photo.key }));
      if (name) {
        product.name = name;
      } else if (category) {
        product.category = category;
      } else if (stock) {
        product.stock = stock;
      } else if (unit) {
        product.unit = unit;
      } else if (value) {
        product.value = value;
      } else if (description) {
        product.description = description;
      }
      product.photos.push(photosArray);
    }
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
  async addPhoto(id, photos) {
    if (!photos) {
      throw new Error("No photo selected.");
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error(`Product id: ${id} not found!`);
    }

    const newPhotos = photos.map((photo) => ({ photo: photo.key }));

    if (!product.photos) {
      product.photos = newPhotos;
    }

    product.photos.push(newPhotos);

    await product.save();
    return product;
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
      (photo) => photo._id !== photoId
    );

    const photo = product.photos.filter((photo) => photoId === photo._id);

    product.photos = newPhotosArray;

    const deleteS3Options = {
      bucket: "productphotoscatalogo",
      key: photo.photo,
    };

    await s3.send(DeleteObjectCommand(deleteS3Options));

    await product.save();
    return product;
  }
}

module.exports = ProductService;
