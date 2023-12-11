import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService, ConfigService],
})
export class FileModule {}
