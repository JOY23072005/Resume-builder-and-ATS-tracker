import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

export const redisWorker = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});

redis.on("connect",()=>{
    console.log("Redis Connected");
});

redis.on("error",(err)=>{
    console.error("Redis Error:",err);
})

redisWorker.on("connect",()=>{
    console.log("Redis Worker Connected");
});

redisWorker.on("error",(err)=>{
    console.error("Redis Worker Error:",err);
})