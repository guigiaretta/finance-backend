import { randomUUID } from "node:crypto";

type TransactionType = 'income' | 'expense';

export class Entity {
  constructor(private id: string = randomUUID(), private createdAt: Date = new Date(), private updatedAt: Date | null = null) {
  }
}

export class Category extends Entity {
    constructor (private name: string, id: string, private icon?: string, createdAt?: Date, updatedAt?: Date| null) {
        super(id, createdAt, updatedAt);
        }
}

export class Bank extends Entity {
    constructor(private ispb: string, private name: string, private code: string, private fullName: string, id: string, createdAt?: Date, updatedAt?: Date | null) {
        super(id, createdAt, updatedAt);

    }
}


export class Transaction extends Entity {
    bank: Bank;
    category: Category;

    constructor(private description: string, private type: TransactionType, private amount: number, bank: Bank, category: Category, private date: Date, id: string, createdAt?: Date, updatedAt?: Date | null) {
        super(id, createdAt, updatedAt);
        this.bank = bank;
        this.category = category;

    }
 
}