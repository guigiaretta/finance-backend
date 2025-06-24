import { FastifyInstance } from "fastify";
import { transactionUseCase } from "../services/transaction.services";
import { Transaction } from "../entities/entities";
import { createTransaction } from "../interfaces/transaction.interface";
import { transactionRepository } from "../repositories/transaction.repository";
import { bankRepository } from "../repositories/bank.repository";
import { categoryRepository } from "../repositories/category.repository";

export async function transactionRoutes(fastify: FastifyInstance) {
   
    const transactionRepositoryInstance = new transactionRepository();
    const bankRepositoryInstance = new bankRepository(); // Assume you have these
    const categoryRepositoryInstance = new categoryRepository(); // Assume you have these

     const transactionUseCaseInstance = new transactionUseCase(
        transactionRepositoryInstance,
        bankRepositoryInstance,
        categoryRepositoryInstance
     );

    // Create a new transaction
    fastify.post<{ Body: createTransaction }>("/", async (req, reply) => {        
const { description, type, amount, bankId, categoryId, date } = req.body;
        try {
            // Call createTransaction with the DTO object
            const data = await transactionUseCaseInstance.createTransaction({
                description,
                type,
                amount,
                bankId,
                categoryId,
                date,
            });
            return reply.status(201).send(data);
        } catch (error) {
            console.error('Error creating transaction:', error);
            if (error instanceof Error && (error.message === "Bank not found." || error.message === "Category not found.")) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: 'Failed to create transaction' });
        }
    });

    // Get all transactions
    fastify.get("/", async (request, reply) => {
        try {
            const transactions = await transactionUseCaseInstance.getAllTransactions();         
            return reply.send(transactions);
        } catch (error) {   
            console.error("Error fetching transactions:", error);
            return reply.status(500).send({ error: "Failed to fetch transactions" });
        }   }); 

    // Get transaction by ID
    fastify.get("/:id", async (request, reply) => { 
        const { id } = request.params as { id: string };
        try {
            const transaction = await transactionUseCaseInstance.getTransactionById(id);
            if (!transaction) {
                return reply.status(404).send({ error: "Transaction not found" });
            }
            return reply.send(transaction);
        } catch (error) {
            console.error(`Error fetching transaction with ID ${id}:`, error);
            return reply.status(500).send({ error: "Failed to fetch transaction" });
        }
    });
    // Update a transaction
    // fastify.put<{ Body: any; Params: { id: string } }>("/:id", async (request, reply) => {      
    //     const { id } = request.params as { id: string };
    //     const { amount, description, date, categoryId, bankId } = request.body;
    //     try {
    //         const updatedTransaction = await transactionUseCaseInstance.updateTransaction(id, {
    //             amount,
    //             description,
    //             date,
    //             categoryId,
    //             bankId,
    //         });
    //         return reply.send(updatedTransaction);
    //     } catch (error) {
    //         console.error(`Error updating transaction with ID ${id}:`, error);
    //         return reply.status(500).send({ error: "Failed to update transaction" });
    //     }
    // });
    // Delete a transaction
    fastify.delete("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
            await transactionUseCaseInstance.deleteTransaction(id);
            return reply.send();
        } catch (error) {
            console.error(`Error deleting transaction with ID ${id}:`, error);
            if (error instanceof Error && error.message === "Transaction not found for deletion.") {
                return reply.status(404).send({ error: "Transaction not found" });
            }
            return reply.status(500).send({ error: "Failed to delete transaction" });
        }
    });
}

/*
{
"amount":1000,
"description": "casa",
"type": "income",
"date": "10/02/2025",
"category": "",
"bank": ""
}
                */