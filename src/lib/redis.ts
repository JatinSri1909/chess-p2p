import { createClient } from "redis";

// Create a Redis client with configuration from environment variables
const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '19166'),
    tls: process.env.REDIS_TLS === 'true', // Will be false
    connectTimeout: 10000,
  },
  password: process.env.REDIS_PASSWORD,
});

// Handle Redis client errors
client.on("error", (err) => console.error("Redis Client Error:", err));

// Connect to Redis if not already connected
(async () => {
  if (!client.isOpen) {
    await client.connect();
  }
})();

export default client;
