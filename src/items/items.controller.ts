import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    try {
      const data = await this.itemsService.getPublishedItem();
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/featured')
  async findFeatured() {
    try {
      const data = await this.itemsService.getFeaturedItem();
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }
}
