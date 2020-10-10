import { NestFactory } from "@nestjs/core"
import { ApplicationModule } from "./ApplicationModule"
import { ConfigService } from "@nestjs/config"
import * as express from "express"
import { ExpressAdapter } from "@nestjs/platform-express"

async function bootstrap() {
    const server = express()
    const app = await NestFactory.create(
        ApplicationModule,
        new ExpressAdapter(server),
    )

    app.enableCors()

    const config = app.get(ConfigService)
    const appEnv = config.get<string>("APP_ENV", "default")

    if (appEnv === "default") {
        await app.listen(config.get<number>("PORT", 8080))
    } else if (appEnv === "serverless") {
        await app.init()
    } else {
        throw new Error("Unknown APP_ENV: " + appEnv)
    }

    return { server, app }
}

// Bootstrap server
const bootstrapPromise = bootstrap()

// Serverless handler
exports.main = async (req, res, next) => {
    const { server } = await bootstrapPromise
    return server(req, res, next)
}

// Handle termination signals
const stopServer = async () => {
    const { app } = await bootstrapPromise
    await app.close()
}
process.on("SIGTERM", stopServer)
process.on("SIGINT", stopServer)
process.on("SIGHUP", stopServer)
