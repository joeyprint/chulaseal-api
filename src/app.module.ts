import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { AuthorsModule } from './authors/authors.module';
import { FileModule } from './file/file.module';
import { TagsModule } from './tags/tags.module';
import { GeolocationModule } from './geolocation/geolocation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ItemsModule,
    AuthorsModule,
    FileModule,
    TagsModule,
    GeolocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
