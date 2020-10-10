import { DynamicModule, Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ConfigurationModule } from "../../ConfigurationModule"

@Module({})
export class FirestoreModule {
    static async register(): Promise<DynamicModule> {
        const admin = await import("firebase-admin")
        const { Firestore } = await import("@google-cloud/firestore")

        return {
            module: FirestoreModule,
            imports: [ConfigurationModule],
            providers: [{
                provide: Firestore,
                inject: [ConfigService],
                useFactory: (config: ConfigService) => {
                    const fireStoreAuth = config.get<string>("CLOUD_GCP_FIRESTORE_AUTH", "default")

                    let app: any
                    if (fireStoreAuth === "default") {
                        app = admin.initializeApp({ credential: admin.credential.applicationDefault() })
                    } else if (fireStoreAuth === "serverless") {
                        app = admin.initializeApp()
                    } else {
                        app = admin.initializeApp({ credential: admin.credential.cert(fireStoreAuth) })
                    }

                    return app.firestore()
                },
            }],
            exports: [Firestore],
        }
    }
}
