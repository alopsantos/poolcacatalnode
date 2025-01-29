import { db } from "@shared/infra/configs/work.config";

export class KeyIntegration {
  async createKey(key: any): Promise<any> {
    try {
      const searchKey = await db
        .prepare("SELECT * FROM block WHERE keyPublic = ?")
        .get(key.keyPublic);
      if (searchKey) {
        return searchKey;
      }
      const response = await db
        .prepare(
          "INSERT INTO block (codigoWork, keyPublic, privateKey, status) VALUES (?, ?, ?, ?)"
        )
        .run(key.codigoWork, key.keyPublic, key.privateKey, key.status);

      return response;
    } catch (error) {
      console.error(`Erro ao criar key no Key: ${error}`);
    }
  }
}
