module.exports = {
    apps: [
        {
            name: "ai-print-shop",
            script: "npm run start",
            watch: ".",
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
            user: "SSH_USERNAME",
            host: "SSH_HOSTMACHINE",
            ref: "origin/master",
            repo: "GIT_REPOSITORY",
            path: "DESTINATION_PATH",
            "pre-deploy-local": "",
            "post-deploy":
                "npm install && pm2 reload ecosystem.config.js --env production",
            "pre-setup": "",
        },
    },
};
