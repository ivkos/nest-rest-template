import { Module } from "@nestjs/common"
import { FirestoreModule } from "./FirestoreModule"
import { GoogleCloudStorageModule } from "./GoogleCloudStorageModule"

@Module({
    imports: [
        FirestoreModule.register(),
        GoogleCloudStorageModule.register(),
    ],
    exports: [
        FirestoreModule,
        GoogleCloudStorageModule,
    ],
})
export class GcpModule {}
