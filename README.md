# nest-rest-template
Jump-start your Nest.js REST app with this opinionated template


## Requirements
* [Node.js 14](https://nodejs.org/en/download/) or a newer version


## Configuration
The application reads its configuration, from highest to lowest priority, from:
- environment variables
- the `.env` file
- the `.env.default` file

Copy the `.env.default` file, and make changes in your `.env` file:
```bash
cp .env.default .env
nano .env
```

Please note:
- **Do not commit the `.env` file to source control.**
- **Do not make changes to the `.env.default` file.**


## Installation
```bash
npm install
```


## Running the app
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```


## Test
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```


## Database
### Configuration
To enable the database functionality, please add the `DatabaseModule` to the imported modules
in `src/ApplicationModule`, or wherever else the module would be used.

Database credentials are read from the environment, the `.env` and the `.env.default` files.

You can modify advanced database configurations in the `src/db/DatabaseModule.ts` file.

For details on database configuration, please refer to:
* [TypeORM Getting Started Guide](https://typeorm.io/)
* [TypeORM Connection Options](https://typeorm.io/#/connection-options)

### Migrations and TypeORM CLI
Operations related to migrations are provided by the **TypeORM CLI**. For detailed usage information, please refer to
the [TypeORM CLI Guide](https://typeorm.io/#/using-cli).

Migration scripts reside in the `src/db/migrations` directory.

#### Configuration
The **TypeORM CLI** reads its configuration from the `typeorm-cli.js` file, which itself reads environment variables and
the `.env` file. Please make sure you have configured access to the database in those files, before running migrations
via the CLI.

#### Create new migrations
This will generate a new migration template in the `src/db/migrations` directory:
```bash
npm run typeorm migration:create -- -n MyMigration
```
Add the necessary SQL queries to the generated file.


#### Run migrations
Migrations run automatically when the application starts. You can also run migrations manually:
```bash
npm run typeorm migration:run
```


#### Revert migrations
To revert the last migration, please run:
```bash
npm run typeorm migration:revert
```
