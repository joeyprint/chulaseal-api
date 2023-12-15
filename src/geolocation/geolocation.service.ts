import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { QueryPagination } from 'src/utils/pagination';

@Injectable()
export class GeolocationService {
  constructor(private configService: ConfigService) {}

  private readonly apiUrl = this.configService.get('OMEKA_API_URL');

  findAll = async (pagination: QueryPagination) => {
    try {
      const { page = 1, limit = 10 } = pagination;
      const response = await axios.get(
        `${this.apiUrl}/geolocations?page=${page}&per_page=${limit}`,
      );

      const geolocationList = await response.data;

      return geolocationList.map((location) => {
        const { id, latitude, longitude, zoom_level, item } = location;

        return {
          id,
          latitude,
          longitude,
          zoomLevel: zoom_level,
          item: { id: item.id },
        };
      });
    } catch (error) {
      throw error;
    }
  };

  findOne = async (locationId: number) => {
    try {
      const response = await axios.get(
        `${this.apiUrl}/geolocations/${locationId}`,
      );

      const geolocation = await response.data;

      const { id, latitude, longitude, zoom_level } = geolocation;

      return {
        id,
        latitude,
        longitude,
        zoomLevel: zoom_level,
      };
    } catch (error) {
      throw error;
    }
  };
}
