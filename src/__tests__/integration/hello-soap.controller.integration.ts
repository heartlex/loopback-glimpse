import {P1Application} from '../../application';
import {before} from 'mocha';
import {Client, createRestAppClient, expect} from '@loopback/testlab';
import nock from 'nock';

describe.skip('Integration test helloSoap', () => {
  const SERVICE_HOST = 'http://127.0.0.1:8080/WSDLFirst-TopDown-Example-1.2/hello';

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

  function setupWsdlNock() {
    return nock(SERVICE_HOST)
      .get(uri => uri.includes('wsdl'))
      .replyWithFile(200, 'src/__tests__/integration/hello-soap-fixtures/helloService.wsdl');
  }

  function setupXsdNock() {
    return nock(SERVICE_HOST)
      .get(uri => uri.includes('xsd=1'))
      .replyWithFile(200, 'src/__tests__/integration/hello-soap-fixtures/helloService.xsd');
  }

  function setupNockOK() :void {
    nock(SERVICE_HOST, {
      reqheaders: {
        soapaction: `"${SERVICE_HOST}"`
      }
    }).post(uri => uri.includes('hello'))
      .replyWithFile(200, 'src/__tests__/integration/hello-soap-fixtures/response.xml');
  }

  it('test say hello', async () => {
    setupXsdNock();
    setupWsdlNock();
    setupNockOK();

    const name = encodeURIComponent('Giuliano');
    const res = await client.get('/sayHello/' + name);
    expect(res.status).to.equal(200);
    expect(res.body).to.containEql({});
  });
})
