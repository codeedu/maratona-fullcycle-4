import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';

@model()
export class Category extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    default: () => uuid()
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'object',
    required: true,
  })
  join: {name: string, parent: string};

  constructor(data?: Partial<Category>) {
    super(data);
  }
}