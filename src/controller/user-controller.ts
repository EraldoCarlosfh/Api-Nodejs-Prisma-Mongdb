import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/user.service';
import { User } from 'prisma/prisma-client';

class UserController {
    async getUsers(reply: FastifyReply) {

        const service = new UserService();

        const users = await service.getUsers();
        reply.send(users)
    }

    async getUserLogin(request: FastifyRequest, reply: FastifyReply) {

        const service = new UserService();
        const { email, password } = request.query as { email: string, password: string }

        if (!email || !password)
            throw new Error("Preencha todos os campos.");

        const user = await service.getUserLogin({email, password});
        reply.send(user)
    }

    async getUserById(request: FastifyRequest, reply: FastifyReply) {

        const service = new UserService();
        const { id } = request.query as { id: string }

        if (!id )
            throw new Error("Necessário inserir o id do usuário."); 

        const user = await service.getUserById({id});
        reply.send(user)
    }

    async postUser(request: FastifyRequest, reply: FastifyReply) {
        const service = new UserService();
         const { userName, email, photoUrl, password, count, isActive } = request.body as User;   

         if (!userName || !email || !password)
            throw new Error("Preencha todos os campos.");

        const user = await service.postUser({ userName, email, photoUrl, password, count, isActive });

        reply.send(user)
    }

    async putUser(request: FastifyRequest, reply: FastifyReply) {
        const service = new UserService();
         const { id } = request.query as { id: string };   

         if (!id )
            throw new Error("Necessário inserir o id do usuário.");      

        const user = await service.putUser({ id });

        reply.send(user)
    }

    async deleteUserById(request: FastifyRequest, reply: FastifyReply) {

        const service = new UserService();
        const { id } = request.query as { id: string }

        if (!id)
            throw new Error("Necessário inserir o id do usuário.");  

        const users = await service.deleteUserById({id});
        reply.send(users)
    }
    
}

export { UserController }