import { Category } from "../entities/entities";



export interface categoryUpdate {
  name?: string;
  icon?: string;
}

export interface ICategory{
  create(category: Category): Promise<Category>;          
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;   
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}   