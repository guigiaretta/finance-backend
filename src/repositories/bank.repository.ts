import { prisma } from '../database/prisma-finance';
import { Bank } from '../entities/entities';
import { IBank } from '../interfaces/bank.interface';

export class bankRepository implements IBank{
    private banks: Map<string, Bank> = new Map();

    async create(bank: Bank): Promise<Bank> {
        const result = await prisma.bank.create({
            data: {
                id: bank.id,
                name: bank.name,
                ispb: bank.ispb,
                code: bank.code,
                fullName: bank.fullName,
            }
        });
        this.banks.set(bank.id, bank);
        return result;
    }

    async findById(id: string): Promise<Bank | null> {
        const result = await prisma.bank.findUnique({ where: { id } });
         if (!result) return null;
    
        return result;
    }

    async findAll(): Promise<Bank[]> {
        const banksArray = await prisma.bank.findMany();

        return banksArray;
    }

    async update(bank: Bank): Promise<Bank> {
        if (!this.banks.has(bank.id)) {
            throw new Error('Bank not found');
        }
        this.banks.set(bank.id, bank);
        return bank;
    }

    async delete(id: string): Promise<void> {
        this.banks.delete(id);
    }
}
