import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
