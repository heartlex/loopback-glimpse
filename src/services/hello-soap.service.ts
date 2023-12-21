import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {HelloSoapDataSource} from '../datasources';

export interface HelloSoap {
  //Restituisco un object per fare vedere la struttura json parsata direttamente dall'xml di risposta
  sayHello(): Promise<Object>
}

export class HelloSoapProvider implements Provider<HelloSoap> {
  constructor(
    // HelloSOAP must match the name property in the datasource json file
    @inject('datasources.HelloSOAP')
    protected dataSource: HelloSoapDataSource = new HelloSoapDataSource(),
  ) {}

  value(): Promise<HelloSoap> {
    return getService(this.dataSource);
  }
}
