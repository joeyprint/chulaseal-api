import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { AuthorsService } from 'src/authors/authors.service';
import { FileService } from 'src/file/file.service';
import { GeolocationService } from 'src/geolocation/geolocation.service';
import { TagsService } from 'src/tags/tags.service';
import { QueryPagination } from 'src/utils/pagination';

@Injectable()
export class ItemsService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly tagsService: TagsService,
    private readonly fileService: FileService,
    private readonly geolocationService: GeolocationService,
    private configService: ConfigService,
  ) {}

  private readonly apiUrl = this.configService.get('OMEKA_API_URL');

  static getElementByName = (name: string, elements: any): string => {
    const items = elements.filter((element) => {
      const topicName = element.element.name;
      return name === topicName;
    });

    if (items.length === 0) return;
    if (items.length === 1) {
      return items[0].text;
    }

    return items.map((item) => item.text);
  };

  getTags = async (originalTags: any) => {
    const tagsPromises = originalTags.map(async (tag) => {
      return await this.tagsService.findOne(tag.id);
    });

    const tags = await Promise.all(tagsPromises);

    return tags;
  };

  getPublishedItem = async (pagination: QueryPagination): Promise<any> => {
    try {
      const { page = 1, limit = 10 } = pagination;
      const response = await axios.get(
        `${this.apiUrl}/items?page=${page}&per_page=${limit}&sort_field=modified&sort_dir=desc`,
      );
      const items = await response.data;

      const newItemsPromises = items
        .filter((item) => item.public)
        .map(async (item: any) => {
          const { id, collection, element_texts } = item;

          const author = await this.authorsService.findOne(collection.id);

          return {
            id,
            collection: {
              id: author.id,
              title: author.title,
              description: author.description,
            },
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

  getFeaturedItem = async (pagination: QueryPagination): Promise<any> => {
    try {
      const { page = 1, limit = 10 } = pagination;
      const response = await axios.get(
        `${this.apiUrl}/items?page=${page}&per_page=${limit}&sort_field=modified&sort_dir=desc`,
      );
      const items = response.data;

      const newItemsPromises = items
        .filter((item: any) => item.public && item.featured)
        .map(async (item: any) => {
          const { id, collection, element_texts } = item;

          const author = await this.authorsService.findOne(collection.id);

          return {
            id,
            collection: {
              id: author.id,
              title: author.title,
              description: author.description,
            },
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
        element_texts,
        extended_resources: { geolocations },
        tags,
      } = item;

      const fileList = await this.fileService.findByItem(id);
      const tagList = await this.getTags(tags);
      // If has geolocation values
      const geolocation =
        geolocations &&
        (await this.geolocationService.findOne(geolocations.id));

      return {
        id,
        isPublished,
        isFeatured,
        files: fileList,
        title: ItemsService.getElementByName('Title', element_texts),
        description: ItemsService.getElementByName(
          'Description',
          element_texts,
        ),
        creator: ItemsService.getElementByName('Creator', element_texts),
        originalFormat: ItemsService.getElementByName(
          'Original Format',
          element_texts,
        ),
        source: ItemsService.getElementByName('Source', element_texts),
        researchDate: ItemsService.getElementByName('Date', element_texts),
        location: {
          name: ItemsService.getElementByName('Coverage', element_texts),
          ...geolocation,
        },
        accrualMethod: ItemsService.getElementByName(
          'Accrual Method',
          element_texts,
        ),
        publisher: ItemsService.getElementByName('Publisher', element_texts),
        rights: ItemsService.getElementByName('Rights', element_texts),
        rightHolder: ItemsService.getElementByName(
          'Rights Holder',
          element_texts,
        ),
        subjects: ItemsService.getElementByName('Subject', element_texts),
        languages: ItemsService.getElementByName('Language', element_texts),
        subcollection: ItemsService.getElementByName(
          'Is Part Of',
          element_texts,
        ),
        tags: tagList,
      };
    } catch (error) {
      throw error;
    }
  };
}
