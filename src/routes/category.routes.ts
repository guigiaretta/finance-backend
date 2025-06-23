import { FastifyInstance } from 'fastify';
import { categoryCreate } from '../interfaces/category.interface';    
import { categoryUseCase } from '../services/category.services';
import { Category } from '../entities/entities';

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
    fastify.put<{Body: Category}>('/:id', async (request, reply) =>
    {
        const { id } = request.params as { id: string };
        const { name, icon} = request.body;
        try {
            const updatedCategory = await categoryUseCaseInstance.updateCategory(
                new Category(name, icon, id, new Date())
            );
            return reply.send(updatedCategory);
        } catch (error) {
            console.error(`Error updating category with ID ${id}:`, error);
            return reply.status(500).send({ error: 'Failed to update category' });
        }
    }                   
    );
}
