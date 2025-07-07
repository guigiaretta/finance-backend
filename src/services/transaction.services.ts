import { Bank, Transaction } from "../entities/entities";
import { createTransaction, ITransaction } from "../interfaces/transaction.interface";
import { bankRepository } from "../repositories/bank.repository";
import { categoryRepository } from "../repositories/category.repository";
import { transactionRepository } from "../repositories/transaction.repository";
import { randomUUID } from "node:crypto";

class transactionUseCase{
    
    private transactionRepository: transactionRepository; // Dependency for transaction operations
    private bankRepository: bankRepository; // Dependency for bank operations
    private categoryRepository: categoryRepository; // Dependency for category operations

    constructor() {
        this.transactionRepository = new transactionRepository();
        this.bankRepository = new bankRepository();
        this.categoryRepository = new categoryRepository();


    }

    async createTransaction(data: createTransaction): Promise<Transaction> {
        const bank = await this.bankRepository.findById(data.bank);
        if (!bank) {
            throw new Error("Bank not found.");
        }
        
        const category = await this.categoryRepository.findById(data.category);
        if (!category) {    
            throw new Error("Category not found.");
        }

        const existingTransaction = await this.transactionRepository.findById(data.id);
        if (existingTransaction) {  
            throw new Error("Transaction already exists with this ID.");
        }


        const newTransaction = new Transaction(
            data.description,
            data.type,
            data.amount,
            bank, 
            category,   
            data.date,
            randomUUID(), 
            new Date(),        
        );

        
        const createdTransaction = await this.transactionRepository.create(newTransaction);
        return createdTransaction;
    }
    async getTransactionById(id: string) {
        return await this.transactionRepository.findById(id);
    }
    async getAllTransactions() {
        return await this.transactionRepository.findAll();
    }
    // async updateTransaction(id: string, transaction: Transaction): Promise<Transaction> {
    //     return await this.transactionRepository.update(id, transaction);
    // }
    async deleteTransaction(id: string) {
        return await this.transactionRepository.delete(id);
    }
}

export {transactionUseCase}