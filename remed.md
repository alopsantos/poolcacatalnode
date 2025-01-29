```js
import blingApi from "@shared/infra/configs/bling.config";

export class BlingIntegration {
  async createProduct(product: any): Promise<any> {
    try {
      const response = await blingApi.post("/produto", {
        product: product
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao criar produto no Bling: ${error}`);
      throw new Error(`Erro ao integrar com o Bling`);
    }
  }

  async getProductSkuCode(productSkuCode: string): Promise<any> {
    try {
      const response = await blingApi.get(
        `/produtos?codigos%5B%5D=${productSkuCode}`
      );
      return response.data;
    } catch (error) {
      console.log(`Erro ao buscar produto no Bling: ${error}`);
      throw new Error(`Erro ao integrar com o Bling`);
    }
  }

  async getProductsAll(): Promise<any> {
    try {
      const response = await blingApi.get(`/produtos`);
      return response.data;
    } catch (error) {
      console.log(`Erro ao buscar produto no Bling: ${error}`);
      throw new Error(`Error ao integrar com o Bling`);
    }
  }

  async getProductsId(id: string): Promise<any> {
    try {
      const response = await blingApi.get(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Erro ao buscar produto no Bling: ${error}`);
      throw new Error(`Error ao integrar com o Bling`);
    }
  }
}
```

```js
import { BlingIntegration } from "../integrations/bling.integration";

export class SkusService {
  private blingIntegration: BlingIntegration;

  constructor() {
    this.blingIntegration = new BlingIntegration();
  }

  async getProductSkuCode(productSkuCode: any): Promise<any> {
    const blingResponse = await this.blingIntegration.getProductSkuCode(
      productSkuCode
    );

    return {
      blingResponse
    };
  }
}
```

```js
import { SkusService } from "../services/skus.service";

export class SkusController {
  private skusService: SkusService;

  constructor() {
    this.skusService = new SkusService();
  }

  async getProductSkuCode(productSkuCode: string): Promise<any> {
    return this.skusService.getProductSkuCode(productSkuCode);
  }
}
```

```js
import { FastifyInstance } from "fastify";
import { SkusController } from "@modules/bling/controllers/skus.controller";

const skusController = new SkusController();

async function skusBlingRouter(app: FastifyInstance, opts: any) {

  app.get<{ Params: { codigo: string } }>(
    "/:codigo",
    async (request, reply) => {
      const { codigo } = request.params;
      const produtoBling = await skusController.getProductSkuCode(codigo);
      if (!produtoBling) {
        reply.code(404).send({ error: "produto nao encontrado" });
      }
      return produtoBling;
    }
  );
}

export default skusBlingRouter;

```