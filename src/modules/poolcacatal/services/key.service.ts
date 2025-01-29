import { KeyIntegration } from "../integrations/key.integration";

export class KeyService {
  private keyIntegration: KeyIntegration;
  constructor() {
    this.keyIntegration = new KeyIntegration();
  }

  async createKey(key: any): Promise<any> {
    return await this.keyIntegration.createKey(key);
  }
}
