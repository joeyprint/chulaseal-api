import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, ConfigService],
})
export class AuthorsModule {}
