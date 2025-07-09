import { prisma } from "../database/prisma-finance";
import { Category } from "../entities/entities";
import { ICategory } from "../interfaces/category.interface";


class categoryRepository implements ICategory {
  private categories: Map<string, Category> = new Map();

  async create(category: Category): Promise<Category> {
    const result = await prisma.category.create({
                data: {
                    id: category.id,
                    name: category.name,
                    icon: category.icon
                }
            });
            this.categories.set(category.id, category);
            return result;
  }

  async findById(id: string): Promise<Category | null> {
    const result = await prisma.category.findUnique({ where: { id } });
    if (!result) return null;
    
    return result;
  }

  async findAll(): Promise<Category[]> {
    const categoriesArray = await prisma.category.findMany();
    
    return categoriesArray;
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