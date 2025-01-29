import { KeyService } from "../services/key.service";

export class KeyController {
  private keyService: KeyService;
  constructor() {
    this.keyService = new KeyService();
  }

  async createKey(key: any): Promise<any> {
    console.log(key);
    return await this.keyService.createKey(key);
  }
}
