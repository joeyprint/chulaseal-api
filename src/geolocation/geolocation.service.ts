import { Injectable } from '@nestjs/common';
import { CreateGeolocationDto } from './dto/create-geolocation.dto';
import { UpdateGeolocationDto } from './dto/update-geolocation.dto';

@Injectable()
export class GeolocationService {
  create(createGeolocationDto: CreateGeolocationDto) {
    return 'This action adds a new geolocation';
  }

  findAll() {
    return `This action returns all geolocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geolocation`;
  }

  update(id: number, updateGeolocationDto: UpdateGeolocationDto) {
    return `This action updates a #${id} geolocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} geolocation`;
  }
}
