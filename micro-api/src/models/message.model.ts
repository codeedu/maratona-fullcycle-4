import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';

@model()
export class Message extends Entity {

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
  content: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'object',
    required: true,
  })
  join: {name: string, parent: string};

  @property({
    type: 'date',
    required: true,
    default: () => new Date()
  })
  created_at: Date;

  constructor(data?: Partial<Message>) {
    super(data);
  }
}