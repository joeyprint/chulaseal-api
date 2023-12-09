import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ItemsService {
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

      const newItems = [];

      items.map((item: any) => {
        const {
          id,
          public: isPublished,
          collection,
          owner,
          element_texts,
        } = item;
        if (isPublished) {
          newItems.push({
            id,
            collection,
            owner,
            title: ItemsService.getElementByName('Title', element_texts),
            description: ItemsService.getElementByName(
              'Description',
              element_texts,
            ),
          });
        }
      });

      return newItems;
    } catch (error) {
      throw error;
    }
  };

  getFeaturedItem = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/items`,
      );

      const items = await response.data;

      const newItems = [];

      items.map((item: any) => {
        const {
          id,
          public: isPublished,
          featured: isFeatured,
          collection,
          owner,
          element_texts,
        } = item;
        if (isPublished && isFeatured) {
          newItems.push({
            id,
            collection,
            owner,
            title: ItemsService.getElementByName('Title', element_texts),
            description: ItemsService.getElementByName(
              'Description',
              element_texts,
            ),
          });
        }
      });

      return newItems;
    } catch (error) {
      throw error;
    }
  };

  // create(createItemDto: CreateItemDto) {
  //   return 'This action adds a new item';
  // }

  // findAll() {
  //   return `This action returns all items`;
  // }

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
        owner,
        element_texts,
      } = item;

      return {
        id,
        isPublished,
        isFeatured,
        collection,
        owner,
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

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }
}
