import {inject} from '@loopback/core';
import {HelloSoap} from '../services';
import {get} from '@loopback/rest';

export class HelloSoapController {
  constructor(
    @inject('services.HelloSoap') protected helloSoapService: HelloSoap,
  ) {}

  @get(`/sayHello`)
  async sayHello(): Promise<Object> {
    return this.helloSoapService.sayHello();
  }
}
