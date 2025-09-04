
import { Ratelimit } from '@upstash/ratelimit'; // for deno: see above
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

//creat a ratelimiter that allows 10 requeste per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10,"20 s")
})

export default ratelimit;