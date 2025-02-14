import { app } from "./app";
import { initializeDatabase } from "@shared/infra/configs/work.config";

initializeDatabase();

const startServer = async () => {
  try {
    await app.listen({ port: Number(process.env.PORTPRODUCT) || 3301 });
    console.log(
      `Servidor rodando na porta ${
        process.env.PORTPRODUCT ? process.env.PORTPRODUCT : "3301"
      }`
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();
