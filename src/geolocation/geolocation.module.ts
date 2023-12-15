import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';

@Module({
  controllers: [GeolocationController],
  providers: [GeolocationService, ConfigService],
})
export class GeolocationModule {}
