import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  private readonly apiUrl = this.configService.get('OMEKA_API_URL');

  findOne = async (fileId: number) => {
    try {
      const response = await axios.get(`${this.apiUrl}/files/${fileId}`);

      const file = await response.data;

      const { id, file_urls, original_filename, mime_type } = file;
      const assetType = mime_type.split('/');

      return {
        id,
        url: file_urls.original,
        name: original_filename,
        type: assetType[assetType.length - 1],
      };
    } catch (error) {
      throw error;
    }
  };

  findByItem = async (itemId: number) => {
    try {
      const response = await axios.get(`${this.apiUrl}/files?item=${itemId}`);

      const files = await response.data;

      const newFiles = files.map((file) => {
        const { id, file_urls, original_filename, mime_type } = file;
        const assetType = mime_type.split('/');

        return {
          id,
          url: file_urls.original,
          name: original_filename,
          type: assetType[assetType.length - 1],
        };
      });

      return newFiles;
    } catch (error) {
      throw error;
    }
  };
}
