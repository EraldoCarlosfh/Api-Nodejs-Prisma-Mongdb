import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./router";

const port = process.env.PORT || 3000;
const app = Fastify({logger: true})
app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({message: error.message})
})

const start = async() => {

    await app.register(cors);
    await app.register(routes);

    try {
        await app.listen(port, () => {
            console.log(`Servidor rodando na porta: ${port} ...`)
        })
    }catch(err) {
        process.exit(1);
    }
}

start();