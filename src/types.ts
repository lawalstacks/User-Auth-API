declare namespace NodeJS {
    interface ProcessEnv {
        MONGO_URL: string;
        NODE_ENV: 'development',
        JWT_SECRET: string;
        PORT?: string;
    }
}
