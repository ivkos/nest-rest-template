import { DynamicModule, Module } from "@nestjs/common"
import { ConfigurationModule } from "../../ConfigurationModule"
import { ConfigService } from "@nestjs/config"

@Module({})
export class GoogleCloudStorageModule {
    static async register(): Promise<DynamicModule> {
        const { Storage } = await import("@google-cloud/storage")

        return {
            module: GoogleCloudStorageModule,
            imports: [ConfigurationModule],
            exports: [Storage],
            providers: [{
                provide: Storage,
                inject: [ConfigService],
                useFactory: (config: ConfigService) => {
                    const storageAuth = config.get<string>("CLOUD_GCP_STORAGE_AUTH", "default")

                    if (storageAuth === "default") {
                        return new Storage()
                    }

                    return new Storage({ keyFilename: storageAuth })
                },
            }],
        }
    }
}
