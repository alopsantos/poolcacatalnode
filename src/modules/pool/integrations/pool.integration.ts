import poolApi from "@shared/infra/configs/pool.config";

export class PoolIntegration {
  async getPoolKeyRange(): Promise<any> {
    try {
      const response = await poolApi.get("/block");

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Erro ao integrar com o Pool`);
    }
  }

  async sendPoolKeyWork(privateKeys: string[]): Promise<any> {
    try {
      const response = await poolApi.post("/block", {
        privateKeys
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Erro ao integrar com o Pool`);
    }
  }
}
