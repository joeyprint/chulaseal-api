import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class ItemsService {
  constructor(private readonly authorsService: AuthorsService) {}
  private readonly apiUrl = process.env.OMEKA_API_URL;

  static getElementByName = (name: string, elements: any): string => {
    const element = elements.find((element) => {
      const topicName = element.element.name;
      return name === topicName;
    });

    return element.text;
  };

  getPublishedItem = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/items`,
      );

      const items = await response.data;

      const newItemsPromises = items
        .filter((item) => item.public)
        .map(async (item: any) => {
          const { id, collection, element_texts } = item;

          const author = await this.authorsService.findOne(collection.id);

          return {
            id,
            collection: { ...author },
            title: ItemsService.getElementByName('Title', element_texts),
            description: ItemsService.getElementByName(
              'Description',
              element_texts,
            ),
          };
        });

      const newItems = await Promise.all(newItemsPromises);

      return newItems;
    } catch (error) {
      throw error;
    }
  };

  getFeaturedItem = async (): Promise<any> => {
    try {
      const response = await axios.get(
        'https://www.chulaseal.com/field/api/items',
      );
      const items = response.data;

      const newItemsPromises = items
        .filter((item: any) => item.public && item.featured)
        .map(async (item: any) => {
          const { id, collection, element_texts } = item;

          const author = await this.authorsService.findOne(collection.id);

          return {
            id,
            collection: { ...author },
            title: ItemsService.getElementByName('Title', element_texts),
            description: ItemsService.getElementByName(
              'Description',
              element_texts,
            ),
          };
        });

      const newItems = await Promise.all(newItemsPromises);

      return newItems;
    } catch (error) {
      throw error;
    }
  };

  findOne = async (itemId: number): Promise<any> => {
    try {
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/items/${itemId}`,
      );

      const item = await response.data;

      const {
        id,
        public: isPublished,
        featured: isFeatured,
        collection,
        element_texts,
      } = item;

      const author = await this.authorsService.findOne(collection.id);

      return {
        id,
        isPublished,
        isFeatured,
        collection: { ...author },
        title: ItemsService.getElementByName('Title', element_texts),
        description: ItemsService.getElementByName(
          'Description',
          element_texts,
        ),
      };
    } catch (error) {
      throw error;
    }
  };
}
