import { prisma } from "../database/prisma-finance";
import { Transaction } from "../entities/entities";
import { ITransaction, transctionCreateData } from "../interfaces/transaction.interface";


export class transactionRepository implements ITransaction {
  private transactions: Transaction[] = [];

  async create(transaction: transctionCreateData): Promise<Transaction> {
    const result = await prisma.transactions.create({
    data: {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
      date: transaction.date,
      category: {
        connect: { id: transaction.category.id }
      },
      bank: {
        connect: { id: transaction.bank.id }
      }
    },
    include: {
      bank: true,
      category: true
    }
  });

  // adapta para sua classe de domínio se necessário
  return new Transaction(
    result.description,
    result.type,
    result.amount,
    result.bank,       // ou result.bankId se mudar para string
    result.category,
    result.date,
    result.id,
    result.createdAt,
    result.updatedAt
  );
}

  async findById(id: string): Promise<Transaction | null> {
    const result = await prisma.transactions.findUnique({
       where: { id },
       include: {
          bank: true,
          category: true
    }});
         if (!result) return null;
    
        return result;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async update(id: string, transaction: Transaction): Promise<Transaction | null> {
    const index = this.transactions.findIndex(t => t.id === id);    
    if (index === -1) {
      return null; // Transaction not found
    }
    this.transactions[index] = transaction;
    return transaction;
    }

  async delete(id: string): Promise<void> {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }
}