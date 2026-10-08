import { Redis } from "@upstash/redis";

// REST-based client: no persistent connection, safe for serverless
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;
