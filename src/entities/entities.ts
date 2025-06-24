import { randomUUID } from "node:crypto";

type TransactionType = 'income' | 'expense';

export class Entity {

  constructor(public id: string, public createdAt: Date, public updatedAt?: Date | null) {
  
}}

export class Category extends Entity {
    constructor (public name: string, id: string = randomUUID(), public icon: string, createdAt: Date, updatedAt?: Date | null) {
        super(id, createdAt, updatedAt);
        }
}

export class Bank extends Entity {
    constructor(public ispb: string, public name: string, public code: string, public fullName: string, id: string = randomUUID(), createdAt: Date, updatedAt?: Date | null) {
        super(id, createdAt, updatedAt);

    }
}


export class Transaction extends Entity {
    bank: Bank;
    category: Category;

    constructor(public description: string, public type: TransactionType, public amount: number, bank: Bank, category: Category, public date: Date, id: string = randomUUID(), createdAt: Date, updatedAt?: Date | null) {
        super(id, createdAt, updatedAt);
        this.bank = bank;
        this.category = category;

    }
 
}