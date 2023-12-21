import {P1Application} from '../../application';
import {before} from 'mocha';
import {Client, createRestAppClient, expect} from '@loopback/testlab';
import nock from 'nock';
import {Coordinates} from '../../models/coordinates.model';


describe('Integration test coordinates', () => {
  const SERVICE_HOST = 'https://geocoding.geo.census.gov';

  let app: P1Application;
  let client: Client;

  before(async () => {
    app = new P1Application({
      rest: {
        port: 0,
      },
    });
    await app.boot();
    await app.start();

    client = createRestAppClient(app);
  });

  after(async () => {
    await app.stop();
  });

  function setupNockOK() :void {
    nock(SERVICE_HOST)
      .get(uri => uri.includes('onelineaddress'))
      .replyWithFile(200, 'src/__tests__/integration/coordinates-fixtures/response200.json');
  }

  it('test get coordinates', async () => {
    setupNockOK();

    const address = encodeURIComponent('1450 Pennsylvania Avenue NW, Washington, DC 20230, United States');
    const res = await client.get('/todo-for-tests/coordinates/' + address);
    expect(res.status).to.equal(200);
    const mockedResponseFromServer: Coordinates = new Coordinates({x: 10, y: 20});
    expect(res.body).to.containEql(mockedResponseFromServer);
  });
})
