import { Module } from "@nestjs/common"
import { ApiModule } from "./api/ApiModule"
import { ConfigurationModule } from "./ConfigurationModule"
import { DatabaseModule } from "./db/DatabaseModule"

@Module({
    imports: [
        ConfigurationModule,
        ApiModule,
        // DatabaseModule, // TODO Uncomment to enable database functionality
    ],
})
export class ApplicationModule {}
