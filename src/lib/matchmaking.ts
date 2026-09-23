import redis from "./redis";

// Define the structure of a Match
export interface Match {
  player1: string;
  player2: string;
  roomId: string;
  playerSides: { [key: string]: 'white' | 'black' };
}

/**
 * Add a user to the matchmaking queue.
 */
export async function addToQueue(userId: string): Promise<void> {
  await redis.rpush("matchmaking_queue", userId);
}

/**
 * Retrieve the next opponent from the queue.
 */
export async function findOpponent(): Promise<string | null> {
  return await redis.lpop("matchmaking_queue");
}

/**
 * Save the details of a match to Redis.
 */
export async function saveMatch(match: Match): Promise<void> {
  const matchKey = `match:${match.player1}`;
  await redis.hset(matchKey, {
    player1: match.player1,
    player2: match.player2,
    roomId: match.roomId,
    playerSides: match.playerSides,
  });
  await redis.expire(matchKey, 3600); // Optional: Set a TTL of 1 hour
}

/**
 * Get the match data for a given user.
 */
export async function getMatch(userId: string): Promise<Match | null> {
  const matchKey = `match:${userId}`;
  const matchData = await redis.hgetall<Record<string, unknown>>(matchKey);

  if (!matchData || Object.keys(matchData).length === 0) return null;

  return matchData as unknown as Match;
}
