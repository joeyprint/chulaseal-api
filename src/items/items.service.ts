import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private readonly apiUrl = process.env.OMEKA_API_URL;

  async fetchData(): Promise<any> {
    try {
      console.log(this.apiUrl);
      const response = await axios.get(
        `https://www.chulaseal.com/field/api/items`,
      );

      console.log({ data: response.data });
      return await response.data;
    } catch (error) {
      throw error;
    }
  }

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
