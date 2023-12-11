import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TagsService {
  constructor(private configService: ConfigService) {}

  private readonly apiUrl = this.configService.get<string>('OMEKA_API_URL');

  findOne = async (tagId: number) => {
    try {
      const response = await axios.get(`${this.apiUrl}/tags/${tagId}`);

      const tag = await response.data;

      const { id, name } = tag;

      return { id, name };
    } catch (error) {
      throw error;
    }
  };
}
