import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { ItemsService } from 'src/items/items.service';

@Injectable()
export class AuthorsService {
  // create(createAuthorDto: CreateAuthorDto) {
  //   return 'This action adds a new author';
  // }

  // findAll() {
  //   return `This action returns all authors`;
  // }

  getPublishedAuthors = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/collections`,
      );

      const authors = await response.data;

      const newAuthors = [];

      authors.map((item: any) => {
        const { id, public: isPublished, element_texts } = item;
        if (isPublished) {
          newAuthors.push({
            id,
            title: ItemsService.getElementByName('Title', element_texts),
            description: ItemsService.getElementByName(
              'Description',
              element_texts,
            ),
          });
        }
      });

      return newAuthors;
    } catch (error) {
      throw error;
    }
  };

  getFeaturedAuthors = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/collections`,
      );

      const authors = await response.data;

      const newAuthors = [];

      authors.map((item: any) => {
        const {
          id,
          public: isPublished,
          featured: isFeatured,
          element_texts,
        } = item;

        if (isPublished && isFeatured) {
          newAuthors.push({
            id,
            title: ItemsService.getElementByName('Title', element_texts),
            description: ItemsService.getElementByName(
              'Description',
              element_texts,
            ),
          });
        }
      });

      return newAuthors;
    } catch (error) {
      throw error;
    }
  };

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }
}
