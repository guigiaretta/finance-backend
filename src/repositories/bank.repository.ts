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
        const result = await prisma.bank.update({
            where: { id: bank.id },
            data: {
            name: bank.name,
            ispb: bank.ispb,
            code: bank.code,
            fullName: bank.fullName,
            updatedAt: new Date()
            }
        });

        return new Bank(
            result.id,
            result.name,
            result.ispb,
            result.code,
            result.fullName,
            result.createdAt,
            result.updatedAt
        );
}

    async delete(id: string): Promise<void> {
        const bank = await this.findById(id);
        if (!bank) {
            throw new Error("Bank not found");
        }
        
        await prisma.bank.delete({ where: { id } });
        this.banks.delete(id);
    }
}
