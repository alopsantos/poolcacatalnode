import { WorkService } from "../services/work.service";

export class WorkController {
  private workService: WorkService;

  constructor() {
    this.workService = new WorkService();
  }

  async createWork(work: any): Promise<any> {
    return await this.workService.createWork(work);
  }
}
