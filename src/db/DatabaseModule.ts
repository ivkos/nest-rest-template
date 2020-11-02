import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigurationModule } from "../ConfigurationModule"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface"
import * as path from "path"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): TypeOrmModuleOptions => {
                return {
                    type: config.get<any>("DB_TYPE"),
                    host: config.get<string>("DB_HOST"),
                    port: config.get<number>("DB_PORT"),
                    database: config.get<string>("DB_DATABASE"),
                    username: config.get<string>("DB_USERNAME"),
                    password: config.get<string>("DB_PASSWORD"),

                    autoLoadEntities: true,

                    synchronize: false,
                    migrationsRun: true,
                    migrations: [
                        path.join(__dirname, "/migrations/*.js"),
                    ],

                    namingStrategy: new SnakeNamingStrategy(),
                }
            },
        }),
    ],
})
export class DatabaseModule {}
