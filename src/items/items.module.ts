import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

import { AuthorsService } from 'src/authors/authors.service';
import { FileService } from 'src/file/file.service';
import { TagsService } from 'src/tags/tags.service';

@Module({
  controllers: [ItemsController],
  providers: [
    ItemsService,
    AuthorsService,
    FileService,
    TagsService,
    ConfigService,
  ],
})
export class ItemsModule {}
