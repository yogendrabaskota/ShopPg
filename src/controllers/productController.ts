import { Request, Response } from "express";
import sendResponse from "../services/sendResponse";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";

interface ProductRequest extends Request{
    file : {
        filename : string
    }
}

class ProductController{
    async createProduct(req:ProductRequest,res:Response):Promise<void>{
        const {productName,productDescription,productPrice,discount,productTotalStock,categoryId}=  req.body
        const filename = req.file? req.file.filename : "dummyimage"

        if(!productName || !productDescription || !productPrice || !productTotalStock){
            sendResponse(res,400,"Please provide productName,productDescription,productPrice,discount,productTotalStock")
            return
        } 
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStock,
            discount : discount || 0,
            categoryId,
            productImageUrl : filename
        })
        sendResponse(res,201,"Product Created successfully")
    }

    async getAllProducts(req:Request,res:Response):Promise<void>{
        const products = await Product.findAll({
            include : [
                {
                model : Category,
            }
        ]
        })
        if(products.length == 0){
            sendResponse(res,404,"No products found")
            return
        }
        sendResponse(res,200,"Products fetched successfully",products)
    }
    async getSingleProduct(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        if(!id){
            sendResponse(res,400,"Please provide product id")
            return
        }
        const product = await Product.findAll({
            where : {
                id : id
            },
            include : [
                {
                model : Category,
            }
        ]
        })
        if(product.length == 0){
            sendResponse(res,404,"Product not found")
            return
        }
        sendResponse(res,200,"Product fetched successfully",product)
    }
    



}
export default new ProductController