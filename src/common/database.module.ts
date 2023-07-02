import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@danieluhm2004/nestjs-tools';

import { Module } from '@nestjs/common';
import _ from 'lodash';

export const options: TypeOrmModuleOptions = {
  type: 'mysql',
  url: _.get(process.env, 'DATABASE_URL'),
  keepConnectionAlive: true,
  synchronize: false,
  entities: [],
};

@Module({ imports: [TypeOrmModule.forRoot(options)] })
export class DatabaseModule {}
