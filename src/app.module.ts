import { DatabaseModule } from './common/database.module';
import { Module } from '@nestjs/common';
import { NTAppModule } from '@danieluhm2004/nestjs-tools';

@Module({
  imports: [NTAppModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
