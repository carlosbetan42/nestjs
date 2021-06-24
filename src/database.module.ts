import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { ConfigType } from '@nestjs/config';
import * as ormconfig from './ormconfig';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, port, username, password, database } =
          configService.database;

        return {
          ...ormconfig,
          host,
          port,
          username,
          password,
          database,
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
