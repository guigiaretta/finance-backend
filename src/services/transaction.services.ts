import { Bank, Transaction } from "../entities/entities";
import { IBank } from "../interfaces/bank.interface";
import { ICategory } from "../interfaces/category.interface";
import { createTransaction, ITransaction } from "../interfaces/transaction.interface";
import { transactionRepository } from "../repositories/transaction.repository";
import { randomUUID } from "node:crypto";

class transactionUseCase{
    
    private transactionRepository: transactionRepository; // Dependency for transaction operations
    private bankRepository: IBank;     // Dependency for fetching Bank
    private categoryRepository: ICategory; // Dependency for fetching Category

    constructor(
        transactionRepository: transactionRepository,
        bankRepository: IBank,
        categoryRepository: ICategory
    ) {
        this.transactionRepository = transactionRepository;
        this.bankRepository = bankRepository;
        this.categoryRepository = categoryRepository;
    }

    async createTransaction(data: createTransaction): Promise<Transaction> {

        const bank = await this.bankRepository.findById(data.bankId);
        if (!bank) {
            throw new Error("Bank not found."); 
        }

        const category = await this.categoryRepository.findById(data.categoryId);
        if (!category) {
            throw new Error("Category not found."); 
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