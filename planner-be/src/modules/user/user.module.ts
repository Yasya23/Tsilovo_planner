import { UserController } from './user.controller';
import { GoalsModule } from '@/goals/goals.module';
import { MailModule } from '@/modules/mail/mail.module';
import { StatisticsModule } from '@/modules/statistics/statistics.module';
import { TaskModule } from '@/tasks/tasks.module';
import { UserModel } from '@/user/model/user.model';
import { UserService } from '@/user/user.service';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    ConfigModule,
    MailModule,
    GoalsModule,
    TaskModule,
    forwardRef(() => StatisticsModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
