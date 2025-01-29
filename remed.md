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

```sql
{
    "id": 11720,
    "position": 921352114,
    "status": 0,
    "range": {
        "start": "0x5adbaadec40000000",
        "end": "0x5adbaadec7fffffff"
    },
    "checkwork_addresses": [
        "12cv7LxmMDQqKYqewsdSPtKguGfKiCsMBM",
        "1LcrhVeNsoMAEtDp18ztUffgMn3MN6naRe",
        "156mi2GQ4tEiGGqzdguRJdpmhszVfxPQrY",
        "1NDMc9UZXXRavGsVGxEH5qKrYNAwLpSkoF",
        "18EK5uKEacNQWpuiyWs6FPR6q3JUVdroC9",
        "1A9aR54XsDb94TnJmNQLPW1GNnta98pX8f",
        "15LEQ5pT8U9kpsRErpz1xyaorkQ7xsAXg7",
        "177ALrb3MAJ7DWGFShtTeNQYCsiDDeF49C",
        "1E5oYKE8oKonU5ttz69uAJbxkT9UArzPA",
        "1BB2PWXsHg7W1JoFb9WLAoKkWVgPeJryhh"
    ],
    "message": "Successfully claimed block at position 921352114"
}
```

```js

async function processRange(startHex: string, endHex: string, searchText: string) {
  let foundValues: string[] = [];
  let start = parseInt(startHex, 16);
  let end = parseInt(endHex, 16);

  for (let i = start; i <= end; i++) {
    const hexValue = i.toString(16);
    if (hexValue.includes(searchText)) {
      foundValues.push(hexValue);
      db.prepare('INSERT INTO found_values (hex_value) VALUES (?)').run(hexValue);
      if (foundValues.length >= 10) break;
    }
  }

  return foundValues;
}


import { Pool } from "pg";
import { SetaDatabaseConfig } from "@shared/infra/configs/seta.config";

export class SetaIntegration {
  private pool: Pool;

  constructor() {
    this.pool = SetaDatabaseConfig.getPool();
  }

  async getProductFromSeta(codigo: string): Promise<any> {
    try {
      const query = `
        SELECT p.codigo, p.descricao, p.corx, m.descricao as marca, p.referencia, p.custo, p.margem, p.preco, p.ncm, d.descricao as departamento, g.descricao as categoria 
        FROM produtos p
        INNER JOIN marcas m ON p.marca = m.codigo
        INNER JOIN departamentos d ON p.departamento = d.codigo
        INNER JOIN grupos g ON p.grupo = g.codigo 
        WHERE p.codigo = $1 AND p.ecommerce = true
      `;
      const values = [codigo];

      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        throw new Error(`Produto não encontrado no ERP Seta.`);
      }
      return result.rows[0];
    } catch (error: any) {
      console.error(
        `Erro ao buscar produto no banco de dados Seta: ${error.message}`
      );
      throw new Error(`Falha ao buscar produto no Erp Seta.`);
    }
  }
}

import { SetaSkuIntegration } from "../integrations/seta.sku.integration";

export class SkusService {
  private setaSkuitegration: SetaSkuIntegration;

  constructor() {
    this.setaSkuitegration = new SetaSkuIntegration();
  }

  async getSkuByCodigo(codigo: string): Promise<any> {
    if (!codigo) {
      throw new Error(`O sku do produto é obrigatorio.`);
    }

    const sku = await this.setaSkuitegration.getSkuByCodigo(codigo);
    return sku;
  }
}
```