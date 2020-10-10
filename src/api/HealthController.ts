import { Controller, Get, Header } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

// Health endpoint adheres to:
//  https://tools.ietf.org/html/draft-inadarei-api-health-check-04

@Controller("/")
export class HealthController {
    constructor(private readonly config: ConfigService) {}

    @Get("/")
    @Header("content-type", "application/health+json")
    async getHealth(): Promise<HealthResponse> {
        const version = this.config.get<string>("VERSION", "0.0.1")
        const versionBuild = this.config.get<string>("VERSION_BUILD", "latest")

        return {
            status: HealthStatus.PASS,
            releaseId: `${version}+${versionBuild}`,
        }
    }
}

export enum HealthStatus {
    PASS = "pass",
    WARN = "warn",
    FAIL = "fail",
}

export interface HealthResponse {
    status: HealthStatus,
    version?: string,
    releaseId?: string,
    serviceId?: string,
    description?: string,
    notes?: string,
}
