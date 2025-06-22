import { Category } from "../entities/entities";
import { categoryCreate } from "../interfaces/category.interface";
import { categoryRepository } from "../repositories/category.repository";

class categoryUseCase { 
    private categoryRepository: categoryRepository;
    constructor(){
        this.categoryRepository = new categoryRepository;
    }
    async createCategory({name, icon}: categoryCreate): Promise<Category> {
        const category = new Category(name, icon, undefined, undefined, undefined);     
        return await this.categoryRepository.create(category);
    }
    async getCategoryById(id: string) {
        return await this.categoryRepository.findById(id);
    }       
    async getAllCategories() {
        return await this.categoryRepository.findAll();
    }
    // async updateCategory(id: string, name: string, icon?: string) {
    //     const category = await this.categoryRepository.findById(id);
    //     if (!category) throw new Error("Category not found");
    //     category.name = name;
    //     category.icon = icon;
    //     return await this.categoryRepository.update(category);
    // }

    async deleteCategory(id: string) {
        return await this.categoryRepository.delete(id);
    }   
}

export {categoryUseCase}