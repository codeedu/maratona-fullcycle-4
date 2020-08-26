import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import * as redis from 'redis';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

const redisAdapter = redisIoAdapter(process.env.REDIS_URI);

export class RedisIoAdapter extends IoAdapter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});

export const redisStore = new RedisStore({ client: redisClient });
