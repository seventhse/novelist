import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(10099)
  console.info(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
