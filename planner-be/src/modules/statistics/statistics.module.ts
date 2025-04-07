import { Module, forwardRef } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { StatisticsModel } from 'src/models/statistics.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { DateModule } from '../date/date.module';
import { TaskModule } from '../tasks/tasks.module';

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
