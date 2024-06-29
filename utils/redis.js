import Redis from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = Redis.createClient();

        this.client.on('error', (error) => {
            console.error(`Redis client error: ${error}`);
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const asyncGet = promisify(this.client.get).bind(this.client);
        try {
            return await asyncGet(key);
        } catch (error) {
            console.error(`Redis get error: ${error}`);
            return null;
        }
    }

    async set(key, value, duration) {
        const asyncSet = promisify(this.client.set).bind(this.client);
        try {
            await asyncSet(key, value, 'EX', duration);
        } catch (error) {
            console.error(`Redis set error: ${error}`);
        }
    }

    async del(key) {
        const asyncDel = promisify(this.client.del).bind(this.client);
        try {
            await asyncDel(key);
        } catch (error) {
            console.error(`Redis del error: ${error}`);
        }
    }
}

const redisClient = new RedisClient();

export default redisClient;
