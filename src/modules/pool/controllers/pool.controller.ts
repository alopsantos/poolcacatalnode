import { PoolService } from "../services/pool.service";

export class PoolController {
  private poolService: PoolService;

  constructor() {
    this.poolService = new PoolService();
  }

  async getPoolKeyRange() {
    return await this.poolService.getPoolKeyRange();
  }

  async sendPoolKeyWork(privateKeys: string[]) {
    return await this.poolService.sendPoolKeyWork(privateKeys);
  }
}
