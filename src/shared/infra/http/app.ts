import fastify from "fastify";
import "reflect-metadata";
import "dotenv/config";
import CoinKey from "coinkey";
import poolRoutes from "../routes/pool/pool.routes";
import { PoolController } from "@modules/pool/controllers/pool.controller";
import { WorkController } from "@modules/poolcacatal/controllers/work.controller";

const app = fastify();

app.register(poolRoutes, { prefix: "/api/v1/pool" });

const poolController = new PoolController();
const workController = new WorkController();

async function createWork() {
  const response = await poolController.getPoolKeyRange();
  const work = {
    id: response.id,
    position: response.position,
    status: response.status,
    rangeStart: response.range.start,
    rangeEnd: response.range.end
  };
  const responseWork = await workController.createWork(work);
  return response;
}
function cleanHex(hex: string): string {
  return hex.startsWith("0x") ? hex.slice(2) : hex;
}

function gerarPublicKey(privateKey: any) {
  const _key = new CoinKey(Buffer.from(privateKey, "hex"));
  _key.compressed = true;
  return _key.publicAddress;
}
async function work() {
  const works = await createWork();
  console.log(works);

  let foundValues: string[] = [];
  let start = BigInt(`0x${cleanHex(works.range.start)}`);
  let end = BigInt(`0x${cleanHex(works.range.end)}`);

  for (let i = end; i >= start; i--) {
    const hexValue = `00000000000000000000000000000000000000000000000${i.toString(
      16
    )}`;
    const publicKey = gerarPublicKey(hexValue);
    // console.log(publicKey, hexValue);
    if (works.checkwork_addresses.includes(publicKey)) {
      console.log(publicKey, hexValue);
    }
  }

  return foundValues;
}

work();
export { app };
