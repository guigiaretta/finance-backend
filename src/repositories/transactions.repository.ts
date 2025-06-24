import { Transaction } from "../entities/entities";
import { ITransaction } from "../interfaces/transaction.interface";


export class transactionRepository implements ITransaction {
  private transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<Transaction> {
    this.transactions.push(transaction);
    return transaction;
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = this.transactions.find(t => t.id === id);
    return transaction || null;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async update(id: string, updatedTransaction: Partial<Transaction>): Promise<Transaction | null> {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return null;

    const transaction = { ...this.transactions[index], ...updatedTransaction };
    this.transactions[index] = transaction;
    return transaction;
  }

  async delete(id: string): Promise<void> {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }
}