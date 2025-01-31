import fastify from "fastify";
import "reflect-metadata";
import "dotenv/config";
import CoinKey from "coinkey";
import poolRoutes from "../routes/pool/pool.routes";
import { PoolController } from "@modules/pool/controllers/pool.controller";
import { WorkController } from "@modules/poolcacatal/controllers/work.controller";
import { KeyController } from "@modules/poolcacatal/controllers/key.controller";

const app = fastify();

app.register(poolRoutes, { prefix: "/api/v1/pool" });

const poolController = new PoolController();
const workController = new WorkController();
const keyController = new KeyController();

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
  return { responseWork, keys: response.checkwork_addresses };
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

  let foundValues: string[] = [];
  let start = BigInt(`0x${cleanHex(works.responseWork.rangeStart)}`);
  let end = BigInt(`0x${cleanHex(works.responseWork.rangeEnd)}`);
  const arrayHexa = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0
  ];
  for (let i = end; i >= start; i--) {
    const hexValue = i.toString(16);
    for (let a = 4; a <= 7; a++) {
      for (let b = 0; b <= arrayHexa.length - 1; b++) {
        // 5adbaadec400168e4
        const privateKey = `00000000000000000000000000000000000000000000000${hexValue.slice(
          0,
          9
        )}${a}${arrayHexa[b]}${hexValue.slice(10, 17)}`;
        const publicKey = gerarPublicKey(privateKey);
        // console.log(privateKey);
        if (publicKey == "1EciYvS7FFjSYfrWxsWYjGB8K9BobBfCXw") {
          const key = {
            codigoWork: works.responseWork.codigo,
            keyPublic: publicKey,
            privateKey: privateKey,
            status: 1
          };
          await keyController.createKey(key);
          break;
        }
        if (works.keys.includes(publicKey)) {
          console.log(publicKey, privateKey);
          const key = {
            codigoWork: works.responseWork.codigo,
            keyPublic: publicKey,
            privateKey: privateKey,
            status: 1
          };
          await keyController.createKey(key);
        }
        console.log(privateKey);
      }
      // console.log(`${hexValue.slice(0, 9)}${a}1${hexValue.slice(11, 17)}`);
    }
  }
  // 5adbaadec51000200
  // 5adbaadec71000118
  // 5adbaadec61000126
  // 5adbaadec7400001c0
  // 5adbaadec60000243
  // 000000000000000000000000000000000000000000000005adbaadec780065e17
  return foundValues;
}

work();
export { app };
