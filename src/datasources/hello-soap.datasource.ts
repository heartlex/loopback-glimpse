import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'HelloSOAP',
  connector: 'soap',
  url: 'http://127.0.0.1:8080/WSDLFirst-TopDown-Example-1.2/hello',
  wsdl: 'http://127.0.0.1:8080/WSDLFirst-TopDown-Example-1.2/hello?wsdl',
  //wsdl: 'src/resources/helloService.wsdl',
  remotingEnabled: true,
  operations: {
  sayHello: {
    service: 'Hello_Service',
    port: 'Hello_PortType',
    operation: 'sayHello'
  }
}
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class HelloSoapDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'HelloSOAP';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.HelloSOAP', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
