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
    if (!this.categories.has(category.id)) {
            throw new Error('Category not found');
        }

    const result = await prisma.category.update({
    where: { id: category.id },
    data: {
      name: category.name,
      icon: category.icon,
      updatedAt: new Date()
    }
  });

  return new Category(
    result.id,
    result.name,
    result.icon,
    result.createdAt,
    result.updatedAt
  );
}

  async delete(id: string): Promise<void> {
    const category = await this.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    
    await prisma.category.delete({ where: { id } });
    this.categories.delete(id);
  }
}
  

export {categoryRepository};