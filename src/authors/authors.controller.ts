import { Controller, Get, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.getPublishedAuthors();
  }

  @Get('/featured')
  findFeatured() {
    return this.authorsService.getFeaturedAuthors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }
}
