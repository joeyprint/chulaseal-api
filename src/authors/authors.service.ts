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

  findOne = async (authorId: number): Promise<any> => {
    try {
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/collections/${authorId}`,
      );

      const author = await response.data;

      const {
        id,
        public: isPublished,
        featured: isFeatured,
        element_texts,
      } = author;

      return {
        id,
        isPublished,
        isFeatured,
        title: ItemsService.getElementByName('Title', element_texts),
        description: ItemsService.getElementByName(
          'Description',
          element_texts,
        ),
        publisher: ItemsService.getElementByName('Publisher', element_texts),
        rights: ItemsService.getElementByName('Rights', element_texts),
        identifier: ItemsService.getElementByName('Identifier', element_texts),
      };
    } catch (error) {
      throw error;
    }
  };
}
