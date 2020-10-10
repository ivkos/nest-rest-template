import { Module } from "@nestjs/common"
import { ApiModule } from "./api/ApiModule"
import { ConfigurationModule } from "./ConfigurationModule"

@Module({
    imports: [
        ConfigurationModule,
        ApiModule,
    ],
})
export class ApplicationModule {}
