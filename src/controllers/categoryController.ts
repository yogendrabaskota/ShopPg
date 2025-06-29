import { Request, Response } from "express"
import Category from "../database/models/categoryModel"
import sendResponse from "../services/sendResponse"

class CategoryController{
    categoryData = [
        {
            categoryName : 'Electronics'
        },
        {
            categoryName : 'Groceries'
        },
        {
            categoryName : 'Foods'
        }
    ]
    async seedCategory():Promise<void>{
        const datas = await Category.findAll()
        if(datas.length == 0){

            await Category.bulkCreate(this.categoryData)
            console.log("Category seeded successfully")
        }else {
            console.log("Category already seeded")
        }


    }

    async addCategory(req:Request,res:Response):Promise<void>{
        const {categoryName} = req.body 
        if(!categoryName){
            sendResponse(res,400,"Please provide cattegory name")
        return
        }
        const categoryFound = await Category.findAll({
            where : {
                categoryName: categoryName,
            }
        })
      
        console.log(categoryFound.length)
        if(categoryFound.length > 0){
            sendResponse(res,400,"Category already exists")
            return
        }

         const newCategory = Category.create({
                categoryName
            })
            sendResponse(res,201,"Category created successfully",newCategory)
        return
        }

    async getAllCategories(req:Request,res:Response):Promise<void>{
        const categories = await Category.findAll()
        if(categories.length == 0){
            sendResponse(res,404,"No categories found")
            return
        }
        sendResponse(res,200,"Categories fetched successfully",categories)
    }

    async deleteCategory(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        if(!id){
            sendResponse(res,400,"Please provide category id")
            return
        }
        const category = await Category.findByPk(id)
        if(!category){
            sendResponse(res,404,"Category not found")
            
        }else {
        await Category.destroy({
            where : {
                id: id
            }
        })
        sendResponse(res,200,"Category deleted successfully")
        }
    }
    async updateCategory(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        const {categoryName} = req.body
        if(!id || !categoryName){
            sendResponse(res,400,"Please provide category id and name")
            return
        }
        const category = await Category.findByPk(id)
        if(!category){
            sendResponse(res,404,"Category not found")
            return
        }
        await Category.update({categoryName},{
            where : {
                id: id
            }
        })
        sendResponse(res,200,"Category updated successfully")
    }
     
}

export default new CategoryController