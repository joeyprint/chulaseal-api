import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FileService {
  findOne = async (fileId: number) => {
    try {
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/files/${fileId}`,
      );

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
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/files?item=${itemId}`,
      );

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
