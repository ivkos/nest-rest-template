import { Module } from "@nestjs/common"
import { HealthController } from "./HealthController"
import { ConfigurationModule } from "../ConfigurationModule"

@Module({
    imports: [ConfigurationModule],
    providers: [],
    controllers: [
        HealthController,
    ],
})
export class ApiModule {}
