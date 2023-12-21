import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GeocoderDataSource} from '../datasources';
import {Coordinates} from '../models/coordinates.model';

export interface Geocoder {
  geocode(address: string): Promise<Coordinates[]>;
}

//A TypeScript class that implements Provider interface and can be bound to the application context
export class GeocoderProvider implements Provider<Geocoder> {
  constructor(
    // geocoder must match the name property in the datasource file
    @inject('datasources.geocoder')
    protected dataSource: GeocoderDataSource = new GeocoderDataSource(),
  ) {}

  value(): Promise<Geocoder> {
    return getService(this.dataSource);
  }
}
