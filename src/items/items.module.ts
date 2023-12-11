import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthorsService } from 'src/authors/authors.service';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, AuthorsService, FileService, ConfigService],
})
export class ItemsModule {}
