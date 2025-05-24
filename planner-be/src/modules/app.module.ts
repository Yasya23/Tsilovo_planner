import { AuthModule } from '@/auth/auth.module';
import { getMongoDbConfig } from '@/config/mongo.config';
import { GoalsModule } from '@/goals/goals.module';
import { StatisticsModule } from '@/statistics/statistics.module';
import { TaskModule } from '@/tasks/tasks.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 25,
        },
      ],
    }),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
