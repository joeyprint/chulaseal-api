import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { AuthorsService } from 'src/authors/authors.service';
import { FileService } from 'src/file/file.service';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class ItemsService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly tagsService: TagsService,
    private readonly fileService: FileService,
    private configService: ConfigService,
  ) {}

  private readonly apiUrl = this.configService.get('OMEKA_API_URL');

  static getElementByName = (name: string, elements: any): string => {
    const element = elements.find((element) => {
      const topicName = element.element.name;
      return name === topicName;
    });

    return element.text;
  };

  getTags = async (originalTags: any) => {
    const tagsPromises = originalTags.map(async (tag) => {
      return await this.tagsService.findOne(tag.id);
    });

    const tags = await Promise.all(tagsPromises);

    return tags;
  };

  getPublishedItem = async (): Promise<any> => {
    try {
      const response = await axios.get(`${this.apiUrl}/items`);
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
      const response = await axios.get(`${this.apiUrl}/items`);
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
      const response = await axios.get(`${this.apiUrl}/items/${itemId}`);

      const item = await response.data;

      const {
        id,
        public: isPublished,
        featured: isFeatured,
        collection,
        element_texts,
        tags,
      } = item;

      const author = await this.authorsService.findOne(collection.id);
      const fileList = await this.fileService.findByItem(id);
      const tagList = await this.getTags(tags);

      return {
        id,
        isPublished,
        isFeatured,
        collection: { ...author },
        files: fileList,
        title: ItemsService.getElementByName('Title', element_texts),
        description: ItemsService.getElementByName(
          'Description',
          element_texts,
        ),
        tags: tagList,
      };
    } catch (error) {
      throw error;
    }
  };
}
