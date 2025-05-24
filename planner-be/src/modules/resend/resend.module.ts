import { ResendService } from './resend.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ResendService],
  imports: [ConfigModule],
  exports: [ResendService],
})
export class ResendModule {}
