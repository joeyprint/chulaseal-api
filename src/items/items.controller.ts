import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(@Query() query) {
    const { page = 1, limit = '10' } = query;
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);

    return this.itemsService.getPublishedItem({
      page: pageNumber,
      limit: pageLimit,
    });
  }

  @Get('/featured')
  findFeatured(@Query() query) {
    const { page = 1, limit = '10' } = query;
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);

    return this.itemsService.getFeaturedItem({
      page: pageNumber,
      limit: pageLimit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }
}
