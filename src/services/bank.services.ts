import { prisma } from "../database/prisma-finance";
import { Bank } from "../entities/entities";
import { bankUpdate, IBank } from "../interfaces/bank.interface";
import { bankRepository } from "../repositories/bank.repository";
import { randomUUID } from "node:crypto";

class bankUseCase{
    private bankRepository: IBank;
    constructor() {
        this.bankRepository = new bankRepository();

    }

    async createBank({ispb, name, code, fullName, id}: Bank): Promise<Bank> {
        const verifyIfExists = await this.bankRepository.findById(id);
        if (verifyIfExists) {
            throw new Error("Bank already exists");
        }
        const bank = await this.bankRepository.create({name, ispb, code, fullName, id: randomUUID(), createdAt: new Date()});
        return bank;
    }
    async getBankById(id: string) {
        return await this.bankRepository.findById(id);
    }
    async getAllBanks() {
        const banks = await this.bankRepository.findAll();

        return banks
    }
    async deleteBank(id: string) {
        return await this.bankRepository.delete(id);
    }
    async updateBank(id: string, updates: bankUpdate): Promise<Bank> {
        const bank = await this.bankRepository.findById(id);

        if (!bank) {
            throw new Error("Bank not found");
        }

        if (updates.name !== undefined) {
            bank.name = updates.name;
        }
        if (updates.ispb !== undefined) {
            bank.ispb = updates.ispb;
        }
        if (updates.code !== undefined) {
            bank.code = updates.code;
        }
        if (updates.fullName !== undefined) {
            bank.fullName = updates.fullName;
        }

        bank.updatedAt = new Date(); // Update timestamp

        return await this.bankRepository.update(bank);
    }
}

export {bankUseCase};