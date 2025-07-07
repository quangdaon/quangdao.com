import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '$env/static/private';
import { Redis } from '@upstash/redis';

const redis = new Redis({
	url: UPSTASH_REDIS_REST_URL,
	token: UPSTASH_REDIS_REST_TOKEN
});

export const cacheGet = <T>(key: string) => redis.get<T>(key);
export const cacheSet = <T>(key: string, content: T, expirationSec: number) =>
	redis.set<T>(key, content, { ex: expirationSec });
