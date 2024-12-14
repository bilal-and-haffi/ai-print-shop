module.exports = {
    apps: [
        {
            name: "ai-print-shop",
            script: "npm run start -- --port 3001",
            watch: ".",
            exec_mode: "cluster",
            instances: "max",
        },
    ],

    env_production: {
        NODE_ENV: "production",
        VERCEL_ENV: "production",
    },
    env_development: {
        NODE_ENV: "development",
    },

    deploy: {
        production: {
            user: "bilal",
            host: "bilal-home-assistant.duckdns.org",
            port: "6969",
            ref: "origin/main",
            repo: "git@github.com:bilal-and-haffi/ai-print-shop.git",
            path: "/home/bilal/pm2",
            // "pre-deploy-local": "",
            "post-deploy":
                "npm install && npm build && pm2 reload ecosystem.config.js --env production", // TODO: add db push , get prod envs etc
            // "pre-setup": "",
        },
    },
};
