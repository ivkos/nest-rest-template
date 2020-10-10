import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import { ApplicationModule } from "../src/ApplicationModule"
import { HealthStatus } from "../src/api/HealthController"

describe("AppController (e2e)", () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ApplicationModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it("GET /", () => {
        return request(app.getHttpServer())
            .get("/")
            .expect(200)
            .expect(res => {
                if (res.body.status !== HealthStatus.PASS) {
                    throw new Error(`status !== "pass"`)
                }
            })
    })
})
