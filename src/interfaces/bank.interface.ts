import { Bank } from '../entities/entities';

export interface bankUpdate{
    name?: string;
    ispb?: string;
    code?: string;
    fullName?: string;
}

export interface IBank {
    create(bank: Bank): Promise<Bank>;
    findById(id: string): Promise<Bank | null>;
    findAll(): Promise<Bank[]>;
    update(bank: Bank): Promise<Bank>;
    delete(id: string): Promise<void>;
    }