import { FastifyInstance } from "fastify";
import { PoolController } from "@modules/pool/controllers/pool.controller";

const poolController = new PoolController();

async function poolRoutes(app: FastifyInstance, opts: any) {
  app.get("/", async (request, reply) => {
    const response = await poolController.getPoolKeyRange();
    if (!response) {
      reply.code(404).send({
        message: "Pool não encontrado"
      });
    }
    return response;
  });
  app.post("/", async (request, reply) => {
    const { privateKeys }: any = request.body;
    const response = await poolController.sendPoolKeyWork(privateKeys);
    return response;
  });
}

export default poolRoutes;
