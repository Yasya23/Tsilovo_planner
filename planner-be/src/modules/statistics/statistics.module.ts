import { StatisticsModel } from './model/statistics.model';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { DateModule } from '@/date/date.module';
import { TaskModule } from '@/tasks/tasks.module';
import { UserModule } from '@/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: StatisticsModel,
        schemaOptions: {
          collection: 'Statistics',
        },
      },
    ]),
    forwardRef(() => TaskModule),
    ConfigModule,
    UserModule,
    DateModule,
  ],
  providers: [StatisticsService],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}
