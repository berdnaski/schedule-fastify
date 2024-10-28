import fastify, { type FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { contactsRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify();

app.register(userRoutes, {
  prefix: "/users",
});

app.register(contactsRoutes, {
  prefix: "/contacts",
})

app.listen({ 
  port: 3000,
}, 
  () => console.log("Server is running")
);