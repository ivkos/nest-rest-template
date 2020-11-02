// Reference:
//  https://typeorm.io/#/connection-options/

module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    synchronize: false,

    migrations: [
        "src/db/migrations/*.ts",
    ],

    cli: {
        migrationsDir: "src/db/migrations",
    },
}
