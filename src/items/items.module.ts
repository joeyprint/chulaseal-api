import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthorsService } from 'src/authors/authors.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, AuthorsService],
})
export class ItemsModule {}
