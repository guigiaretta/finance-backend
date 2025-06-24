import { Transaction } from "../entities/entities";

export interface createTransaction{
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: Date;
  categoryId: string;
  bankId: string;
}


export interface ITransaction {
  create(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  update(id: string, transaction: Transaction): Promise<Transaction | null>;
  delete(id: string): Promise<void>;
}