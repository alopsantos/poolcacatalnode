import { PoolIntegration } from "../integrations/pool.integration";

export class PoolService {
  private poolIntegration: PoolIntegration;

  constructor() {
    this.poolIntegration = new PoolIntegration();
  }

  async getPoolKeyRange() {
    return await this.poolIntegration.getPoolKeyRange();
  }

  async sendPoolKeyWork(privateKeys: string[]) {
    return await this.poolIntegration.sendPoolKeyWork(privateKeys);
  }
}
