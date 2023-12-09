import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthorsService } from 'src/authors/authors.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, AuthorsService, FileService],
})
export class ItemsModule {}
