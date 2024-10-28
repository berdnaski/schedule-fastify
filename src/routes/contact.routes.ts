import { FastifyInstance } from 'fastify';
import { ContactCreate } from '../interfaces/contacts.interface';
import { ContactUseCase } from '../usecases/contact.usecase';
import { authMiddleware } from '../middleware/auth.middleware';

export async function contactsRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.addHook('preHandler', authMiddleware);

  fastify.post<{ Body: ContactCreate }>('/', async (request, reply) => {
    const { name, email, phone } = request.body;
    const emailUser = request.headers['email'];

    try {
      const data = await contactUseCase.create({
        email,
        name,
        phone,
        userEmail: emailUser,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}