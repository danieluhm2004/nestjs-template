import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NotFoundFilter } from './common/filters/notfound.filter';
import { ClassSerializerInterceptor } from './common/interceptors/class-serializer.interceptor';
import { WrapperInterceptor } from './common/interceptors/wrapper.interceptor';
import { validationPipe } from './common/pipes/validationPipe';
import { setupSwagger } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(compression());
  const reflector = app.get(Reflector);
  app.useGlobalPipes(validationPipe());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.useGlobalInterceptors(new WrapperInterceptor());
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalFilters(new NotFoundFilter());
  await setupSwagger(app);

  if (process.env.IS_SCHEDULER === 'true') {
    Logger.log('스케줄러 모드로 실행되었습니다.');
    await app.init();
    return;
  }

  const port = parseInt(process.env.WEB_PORT) || 3000;
  await app.listen(port);
}

bootstrap();
