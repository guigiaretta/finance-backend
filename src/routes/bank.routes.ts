import { FastifyInstance } from 'fastify';   
import { bankUseCase } from '../services/bank.services';
import { Bank, Category } from '../entities/entities';
import { prisma } from '../database/prisma-finance';

export async function bankRoutes(fastify: FastifyInstance){
    const bankUseCaseInstance = new bankUseCase();
    
    // criar
    fastify.post<{Body: Bank}>('/', async (req, reply) => {
        const { ispb, name, code, fullName, id } = req.body;
        // Verifica se todos os campos obrigatórios estão presentes
        if (!ispb || !name || !code || !fullName) {
            return reply.status(400).send({ error: 'All fields are required' });    
        }   
        try {
            const data = await bankUseCaseInstance.createBank(
                {name, 
                ispb, 
                code, 
                fullName, 
                id, 
                createdAt: new Date()}
            );
            return reply.send(data);
        } catch (error) {
            return reply.status(500).send({ error: 'Failed to create bank' });
        }
    });

    // selecionar todos
    fastify.get('/', async (request, reply) => {
        const banks = await bankUseCaseInstance.getAllBanks();
        return reply.send(banks);
    });

    // selecionar por id
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params as { id: string }; 
        try {
            const bank = await bankUseCaseInstance.getBankById(id);
            if (!bank) {
                return reply.status(404).send({ error: 'Bank not found' });
            }
            return reply.send(bank);
        } catch (error) {
            console.error(`Error fetching bank with ID ${id}:`, error);
            return reply.status(500).send({ error: 'Failed to fetch bank' });
        }
    });

    // deletar por id
    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        
        try {
            await bankUseCaseInstance.deleteBank(id); 
            return reply.send(); 
        } catch (error) {
            console.error(`Error deleting bank with ID ${id}:`, error);
            if (error instanceof Error && error.message === "Bank not found for deletion.") { 
                return reply.status(404).send({ error: 'Bank not found' });
            }
            return reply.status(500).send({ error: 'Failed to delete bank' });
        }
    });

    // atualizar
    fastify.put<{Body: Bank}>('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { ispb, name, code, fullName } = request.body;
        try {
            const updatedBank = await bankUseCaseInstance.updateBank(id, { ispb, name, code, fullName });
            return reply.send(updatedBank);     
    } catch (error) {               
            console.error(`Error updating bank with ID ${id}:`, error);
            if (error instanceof Error && error.message === "Bank not found") {
                return reply.status(404).send({ error: 'Bank not found' });
            }
            return reply.status(500).send({ error: 'Failed to update bank' });
        }   
    });

    fastify.patch<{ Params: { id: string }, Body: Partial<{
        name: string;
        ispb: string;
        code: string;
        fullName: string;
        }> }>("/:id", async (request, reply) => {
    const { id } = request.params;
    const { name, ispb, code, fullName } = request.body;

    try {
        const existingBank = await prisma.bank.findUnique({ where: { id } });
        if (!existingBank) {
        return reply.status(404).send({ error: "Bank not found." });
        }

        const updatedBank = await prisma.bank.update({
        where: { id },
        data: {
            name: name ?? existingBank.name,
            ispb: ispb ?? existingBank.ispb,
            code: code ?? existingBank.code,
            fullName: fullName ?? existingBank.fullName,
            updatedAt: new Date()
        }
        });

        return reply.send(updatedBank);
    } catch (error) {
        return reply.status(500).send({ error: "Failed to update bank." });
    }
});
}


//copiar e colar no Insomnia
/*
{
	"ispb": "0000",
	"name": "Caixa",
	"code": "01",
	"fullName": "Banco do Brasil"
}
    */