import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoDbConfig } from '../config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './tasks/tasks.module';
import { GoalsModule } from './goals/goals.module';
import { StatisticsModule } from './statistics/statistics.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    GoalsModule,
    StatisticsModule,
    TaskModule,
  ],
})
export class AppModule {}
