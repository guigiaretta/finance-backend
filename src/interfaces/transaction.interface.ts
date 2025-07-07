import { Transaction } from "../entities/entities";

export interface createTransaction{
  id: string;
  amount: number;
  type: string;
  description: string;
  date: Date;
  category: string;
  bank: string;
}

export interface transctionCreateData {
  id: string; 
  description: string;
  type: string;
  amount: number;
  bank: { id: string };
  category: { id: string };
  date: Date;
}

export interface ITransaction {
  create(transaction: transctionCreateData): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  update(id: string, transaction: Transaction): Promise<Transaction | null>;
  delete(id: string): Promise<void>;
}