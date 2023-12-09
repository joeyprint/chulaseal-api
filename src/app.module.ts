import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { AuthorsModule } from './authors/authors.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ItemsModule, AuthorsModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
