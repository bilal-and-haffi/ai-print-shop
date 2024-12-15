module.exports = {
    apps: [
        {
            name: "ai-print-shop",
            script: "npm run start -- --port 3001",
            watch: ".",
            instances: "max",
            interpreter: "node@22.12.0",
        },
    ],

    env_production: {
        NODE_ENV: "production",
        VERCEL_ENV: "production",
        NVM_DIR: "/home/bilal/.nvm",
    },
    env_development: {
        NODE_ENV: "development",
    },
};
