import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  controllers: [TagsController],
  providers: [TagsService, ConfigService],
})
export class TagsModule {}
