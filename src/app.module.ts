import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
