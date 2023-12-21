import {model, Model, property} from '@loopback/repository';

@model()
export class Coordinates extends Model {
  @property({
    type: 'number',
  })
  x:number;

  @property({
    type: 'number',
  })
  y: number;


  constructor(data?: Partial<Coordinates>) {
    super(data);
  }
}
