import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';
import { AppService } from '../app.service';
import { ResClusterInfoDto } from './dto/clusterInfo.dto';
import { Opcode } from './opcode';

const getDescription = (clusterInfo: ResClusterInfoDto) => {
  let description = clusterInfo.description;
  description += '<br/>';
  for (const [type, error] of Object.entries(Opcode)) {
    const { response, message, status }: any = error();
    description += `<br/><b>${response.opcode} (${type})</b> / ${status} ${message}`;
  }

  return description;
};

export const setupSwagger = async (app: INestApplication) => {
  const clusterInfo = await new AppService().getClusterInfo();
  const config = new DocumentBuilder()
    .setTitle(clusterInfo.name)
    .setDescription(getDescription(clusterInfo))
    .setVersion(clusterInfo.version)
    .addTag('시스템', '시스템과 관련된 것들을 처리합니다.')
    .addBearerAuth({
      description: '인증 토큰',
      name: 'Authorization',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
