import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ItemsService {
  private readonly apiUrl = process.env.OMEKA_API_URL;

  getElementByName = (name: string, elements: any): string => {
    const element = elements.find((element) => {
      const topicName = element.element.name;
      return name === topicName;
    });

    return element.text;
  };

  getPublishedItem = async (): Promise<any> => {
    try {
      console.log(this.apiUrl);
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/items`,
      );

      const items = await response.data;

      const newItems = [];

      items.map((item: any) => {
        const {
          id,
          public: published,
          collection,
          owner,
          element_texts,
        } = item;
        console.log('published', published);
        if (published) {
          newItems.push({
            id,
            collection,
            owner,
            title: this.getElementByName('Title', element_texts),
            description: this.getElementByName('Description', element_texts),
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

  // findOne(id: number) {
  //   return `This action returns a #${id} item`;
  // }

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }
}
