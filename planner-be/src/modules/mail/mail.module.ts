import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [ConfigModule],
  exports: [MailService],
})
export class MailModule {}
