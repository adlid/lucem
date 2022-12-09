module.exports = {
    client: {
        includes: [__dirname + "/src/api/**"],
        service: {
            name: "Lucem",
            url: "http://94.247.128.224:3000/graphql",
        },
    },
};
