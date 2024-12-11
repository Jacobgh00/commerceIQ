import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn2.gsmarena.com",
                pathname: "/vv/pics/**",
            },
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
                pathname: "/images/**",
            },
            {
                protocol: "https",
                hostname: "cf-images.dustin.eu",
                pathname: "/cdn-cgi/image/**",
            },
            {
                protocol: "https",
                hostname: "media.power-cdn.net",
                pathname: "/images/**",
            },
            {
                protocol: "https",
                hostname: "i5.walmartimages.com",
                pathname: "/seo/**",
            },
            {
                protocol: "https",
                hostname: "jorkxgxzvsqjfwnnhlav.supabase.co",
                pathname: "/storage/v1/object/public/products/**"
            }
        ],

    },
};

export default nextConfig;
