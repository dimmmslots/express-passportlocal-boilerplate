import "dotenv/config";
import RedisStore from "connect-redis";
import IORedis from "ioredis";

const redisClient = new IORedis(process.env.REDIS_URL as string);
const redisStore = new RedisStore({ client: redisClient });

export default redisStore;
