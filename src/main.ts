import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const webUrl = process.env.WEB_URL;

  app.enableCors({
    origin: ['http://localhost:3000', webUrl],
  });

  await app.listen(3001);
}
bootstrap();
