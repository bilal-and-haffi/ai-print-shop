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
        ],
    },
};

export default nextConfig;
