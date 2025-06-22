import { Category } from "../entities/entities";
import { ICategory } from "../interfaces/category.interface";


class categoryRepository implements ICategory {
  private categories: Category[] = [];

  async create(category: Category): Promise<Category> {
    this.categories.push(category);
    return category;
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find(cat => cat.id === id);
    return category || null;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async update(category: Category): Promise<Category> {
    const index = this.categories.findIndex(cat => cat.id === category.id);
    if (index === -1) throw new Error("Category not found");
    this.categories[index] = category;
    return category;
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) throw new Error("Category not found");
    this.categories.splice(index, 1);
  }
}
  

export {categoryRepository};