const withTM = require("next-transpile-modules")(["@fullcalendar"]);

const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

    async redirects() {
        return [
            {
                source: "/specializations",
                destination: "/specializations/adult",
                permanent: true,
            },
        ];
    },
    env: {
        backendUrl: "http://94.247.128.224:5000",
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                issuer: {
                    test: /\.(js|ts)x?$/,
                    // for webpack 5 use
                    // { and: [/\.(js|ts)x?$/] }
                },

                use: ["@svgr/webpack"],
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
        );

        return config;
    },
};

module.exports = withTM(nextConfig);
