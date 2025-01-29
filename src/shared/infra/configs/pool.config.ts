import axios from "axios";

const poolApi = axios.create({
  baseURL: `${process.env.POOL_URLAPI}`,
  headers: {
    "Content-Type": "application/json",
    "pool-token": `${process.env.POOL_TOKEN}`
  }
});
export default poolApi;
