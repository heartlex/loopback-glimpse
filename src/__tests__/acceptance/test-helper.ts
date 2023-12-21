import {P1Application} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new P1Application({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: P1Application;
  client: Client;
}

// describe('ProductController', () => {
//   let repository: ProductRepository;
//   beforeEach(givenStubbedRepository);

//   // your unit tests

//   function givenStubbedRepository() {
//     repository = sinon.createStubInstance(ProductRepository);

//   }
//   const findStub = repository.find as sinon.SinonStub;
//   findStub.resolves([{id: 1, name: 'Pen'}]);
//   sinon.assert.calledWithMatch(findStub, {where: {id: 1}});


// });



// export interface GeocoderService {
//   geocode(address: string): Promise<GeoPoint[]>;
// }


// describe('GeocoderController', () => {
//   let geoService: GeoCoderService;
//   let geocode: sinon.SinonStub;

//   beforeEach(givenMockGeoCoderService);

//   // your unit tests

//   function givenMockGeoCoderService() {
//     // this creates a stub with GeocoderService API
//     // in a way that allows the compiler to verify type correctness
//     geoService = {geocode: sinon.stub()};

//     // this creates a reference to the stubbed "geocode" method
//     // because "geoService.geocode" has type from GeocoderService
//     // and does not provide Sinon APIs
//     geocode = geoService.geocode as sinon.SinonStub;
//   }
// });
