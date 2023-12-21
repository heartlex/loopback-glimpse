import {get, getModelSchemaRef, HttpErrors, param, response} from '@loopback/rest';
import {Geocoder} from '../services';
import {inject} from '@loopback/core';
import {Coordinates} from '../models/coordinates.model';
import {logger} from '../logging';

export class CoordinatesController {
  constructor(
    @inject('services.Geocoder') protected geoService: Geocoder,
  ) {}


  //1450 Pennsylvania Avenue NW, Washington, DC 20230, United States
  @get('/todo-for-tests/coordinates/{address}')
  @response(200, {
    description: 'Get coordinates of an address',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Coordinates, {includeRelations: true}),
      },
    },
  })
  async getCoordinates(
    @param.path.string('address') address: string,
  ): Promise<Coordinates> {
    if (address) {
      const geo = await this.geoService.geocode(address);

      logger.log('info', `geo: --> ` + geo + '\n');

      if (!geo[0]) {
        // address not found
        throw new HttpErrors.BadRequest(
          `Address not found: ${address}`,
        );
      }
      return new Coordinates({x: geo[0].x, y: geo[0].y});;
    }

  }
}
