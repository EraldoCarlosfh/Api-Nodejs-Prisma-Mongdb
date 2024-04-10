import { FastifyInstance,FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controller/user-controller";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().getUsers(reply);
    });

    fastify.get(`/user/login`, async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().getUserLogin(request, reply);
    });

    fastify.get(`/user/id`, async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().getUserById(request, reply);
    });

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().postUser(request, reply);
    });

    fastify.put("/user/update", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().putUser(request, reply);
    });

    fastify.delete("/delete", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().deleteUserById(request, reply);
    });
}