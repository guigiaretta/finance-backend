import { Category } from "../entities/entities";
import { categoryCreate, ICategory } from "../interfaces/category.interface";
import { categoryRepository } from "../repositories/category.repository";
import { randomUUID } from "node:crypto";

class categoryUseCase { 
    private categoryRepository: ICategory;
    constructor(){
        this.categoryRepository = new categoryRepository;
    }
    async createCategory({name, icon}: Category): Promise<Category> {
        const category = await this.categoryRepository.create({name, icon, id: randomUUID(), createdAt: new Date()});
        return category;
    }
    async getCategoryById(id: string) {
        return await this.categoryRepository.findById(id);
    }       
    async getAllCategories() {
        return await this.categoryRepository.findAll();
    }

    async deleteCategory(id: string) {
        return await this.categoryRepository.delete(id);
    }   

    async updateCategory({name, icon}: Category): Promise<Category> {
        const category = await this.categoryRepository.update({name, icon, updatedAt: new Date(), id: randomUUID() , createdAt: new Date()});
        return category;
    }
}

export {categoryUseCase}