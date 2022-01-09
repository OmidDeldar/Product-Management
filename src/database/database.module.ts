import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeormConfiguration } from './postgres-typeorm-configuration';

@Module({
    imports:[TypeOrmModule.forRootAsync({useClass:PostgresTypeormConfiguration})]
})
export class DatabaseModule {}
