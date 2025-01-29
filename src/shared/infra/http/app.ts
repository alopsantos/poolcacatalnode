import fastify from "fastify";
import "reflect-metadata";
import "dotenv/config";
import poolRoutes from "../routes/pool/pool.routes";

const app = fastify();

app.register(poolRoutes, { prefix: "/api/v1/pool" });

export { app };
