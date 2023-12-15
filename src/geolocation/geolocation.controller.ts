import { Controller, Get, Param, Query } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  findAll(@Query() query) {
    const { page = 1, limit = '10' } = query;
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);

    return this.geolocationService.findAll({
      page: pageNumber,
      limit: pageLimit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geolocationService.findOne(+id);
  }
}
