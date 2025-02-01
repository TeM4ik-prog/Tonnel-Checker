import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Разрешаем запросы с любого домена
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const PORT = 3000;

  // Используем JSON парсер
  app.use(express.json());

  // Глобальный префикс для API
  app.setGlobalPrefix('api');

  // Обслуживание статики
  app.use(
    '/uploads',
    express.static(join(__dirname, '..', 'uploads')),
  );
  app.use(
    '/public',
    express.static(join(__dirname, '..', 'public')),
  );
  app.use(
    express.static(join(__dirname, '../../client/dist')),
  );

  // Обработка маршрутов: если не API, отправляем фронт
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
    } else {
      res.sendFile(join(__dirname, '../../client/dist/index.html'));
    }
  });

  // Запускаем приложение, слушаем на всех интерфейсах
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nest application is ready on http://localhost:${PORT}`);
  });
}
bootstrap();
