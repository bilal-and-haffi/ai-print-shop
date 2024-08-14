/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "oaidalleapiprodscus.blob.core.windows.net",
            },
            {
                protocol: "https",
                hostname: "images-api.printify.com",
            },
            {
                protocol: "https",
                hostname: "www.facebook.com",
            },
            {
                protocol: "https",
                hostname: "pfy-prod-image-storage.s3.us-east-2.amazonaws.com",
            },
        ],
    },
};

export default nextConfig;
