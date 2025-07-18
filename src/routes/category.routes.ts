import { FastifyInstance } from 'fastify';   
import { categoryUseCase } from '../services/category.services';
import { Category } from '../entities/entities';
import { transactionUseCase } from '../services/transaction.services';
import { prisma } from '../database/prisma-finance';

export async function categoryRoutes(fastify: FastifyInstance){
    const categoryUseCaseInstance = new categoryUseCase();
    //inserir
    fastify.post<{Body: Category}>('/', async (req, reply) => {
        const { name , icon, id } = req.body;
        try {
            const data = await categoryUseCaseInstance.createCategory(
                {name,
                icon,
                id,
                createdAt: new Date()}
            );
            return reply.send(data);
        } catch (error) {
            return reply.status(500).send({ error: 'Failed to create category' });
            
        }
    } );
    //pegar todos
     fastify.get('/', async (request, reply) => {
        const categories = await categoryUseCaseInstance.getAllCategories();
        return reply.send(categories);

} ) ;
    //pegar por id
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params as { id: string }; 
        try {
            const category = await categoryUseCaseInstance.getCategoryById(id);
            if (!category) {
                return reply.status(404).send({ error: 'Category not found' });
            }
            return reply.send(category);
        } catch (error) {
            console.error(`Error fetching category with ID ${id}:`, error);
            return reply.status(500).send({ error: 'Failed to fetch category' });
        }
    });

        // deletar por id
    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
            await categoryUseCaseInstance.deleteCategory(id); 
            return reply.send(); 
        } catch (error) {
            console.error(`Error deleting category with ID ${id}:`, error);
            if (error instanceof Error && error.message === "Category not found for deletion.") { 
                return reply.status(404).send({ error: 'Category not found' });
            }
            return reply.status(500).send({ error: 'Failed to delete category' });
        }
    });

    //atualizar
    fastify.put<{Body: Category}>('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { name, icon } = request.body; // name e icon são opcionais
        try {
            // updateCategory espera o ID e o DTO de atualização
            const updatedCategory = await categoryUseCaseInstance.updateCategory(id, { name, icon });
            return reply.status(200).send(updatedCategory); // 200 OK
        } catch (error) {
            console.error(`Error updating category with ID ${id}:`, error);
            if (error instanceof Error && error.message === "Category not found") { // Erro do UseCase
                return reply.status(404).send({ error: 'Category not found' });
            }
            return reply.status(500).send({ error: 'Failed to update category' });         
   } 
});
    fastify.patch<{ Params: { id: string }, Body: Partial<{
            name: string;
            icon: string;
            }> }>("/:id", async (request, reply) => {
        const { id } = request.params;
        const { name, icon } = request.body;

        try {
            const existingCategory = await prisma.category.findUnique({ where: { id } });
            if (!existingCategory) {
            return reply.status(404).send({ error: "Category not found." });
            }

            const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: name ?? existingCategory.name,
                icon: icon ?? existingCategory.icon,
                updatedAt: new Date()
            }
            });

            return reply.send(updatedCategory);
        } catch (error) {
            return reply.status(500).send({ error: "Failed to update Category." });
        }
    });
    }

/*
{
	"name": "Caixa",
	"icon": "01",
}
*/