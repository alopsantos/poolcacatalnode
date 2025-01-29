import { WorkIntegration } from "../integrations/work.integration";

export class WorkService {
  private workIntegration: WorkIntegration;
  constructor() {
    this.workIntegration = new WorkIntegration();
  }

  async createWork(work: any): Promise<any> {
    return await this.workIntegration.createWork(work);
  }
}
