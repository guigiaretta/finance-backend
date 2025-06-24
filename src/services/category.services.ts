import { Category } from "../entities/entities";
import {  categoryUpdate, ICategory } from "../interfaces/category.interface";
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

    async updateCategory(id: string, updates: categoryUpdate): Promise<Category> {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new Error("Category not found");
        }

        // Apply updates conditionally
        if (updates.name !== undefined) {
            category.name = updates.name;
        }
        if (updates.icon !== undefined) {
            category.icon = updates.icon;
        }

        category.updatedAt = new Date(); // Update timestamp

        return await this.categoryRepository.update(category);
    }
}

export {categoryUseCase}