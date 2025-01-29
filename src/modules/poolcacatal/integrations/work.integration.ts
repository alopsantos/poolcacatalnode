import { db } from "@shared/infra/configs/work.config";

export class WorkIntegration {
  async createWork(work: any): Promise<any> {
    try {
      const searchWork = await db
        .prepare("SELECT * FROM work WHERE id = ?")
        .get(work.id);
      if (!searchWork) {
        const response = await db
          .prepare(
            "INSERT INTO work (id, position, status, rangeStart, rangeEnd) VALUES (?, ?, ?, ?, ?)"
          )
          .run(
            work.id,
            work.position,
            work.status,
            work.rangeStart,
            work.rangeEnd
          );

        return response;
      }
      return searchWork;
    } catch (error) {
      console.error(`Erro ao criar work no Work: ${error}`);
    }
  }
}
