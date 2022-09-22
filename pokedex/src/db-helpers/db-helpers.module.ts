import { Module } from '@nestjs/common';
import { DbHelpersService } from './db-helpers.service';

@Module({
  providers: [DbHelpersService],
  exports: [DbHelpersService],
})
export class DbHelpersModule {}
