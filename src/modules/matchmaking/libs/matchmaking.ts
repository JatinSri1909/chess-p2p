import redis from "@/common/libs/redis";
import { Match } from "../types/matchmaking.types";
import {
  MATCHMAKING_QUEUE_KEY,
  MATCH_KEY_PREFIX,
  MATCH_EXPIRY_SECONDS,
} from "../constants/matchmaking.constants";

/**
 * Add a user to the matchmaking queue in Redis
 */
export async function addToQueue(userId: string): Promise<void> {
  await redis.rpush(MATCHMAKING_QUEUE_KEY, userId);
}

/**
 * Retrieve the next waiting opponent from the queue
 */
export async function findOpponent(): Promise<string | null> {
  return await redis.lpop(MATCHMAKING_QUEUE_KEY);
}

/**
 * Save the details of a match to Redis with expiration
 */
export async function saveMatch(match: Match): Promise<void> {
  const matchKey = `${MATCH_KEY_PREFIX}${match.player1}`;
  await redis.hset(matchKey, {
    player1: match.player1,
    player2: match.player2,
    roomId: match.roomId,
    playerSides: match.playerSides,
  });
  await redis.expire(matchKey, MATCH_EXPIRY_SECONDS);
}

/**
 * Get the match data for a given user from Redis
 */
export async function getMatch(userId: string): Promise<Match | null> {
  const matchKey = `${MATCH_KEY_PREFIX}${userId}`;
  const matchData = await redis.hgetall<Record<string, unknown>>(matchKey);

  if (!matchData || Object.keys(matchData).length === 0) return null;

  return matchData as unknown as Match;
}
