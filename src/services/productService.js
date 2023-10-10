const ProductModel = require("../models/productsModel")
class ProductService{
  async createProduct(req, res){
    const {admin} = req.user
    const {}
    if(!admin){
      throw new Error("You are not allowed to create a new product.")
    }



  }
}