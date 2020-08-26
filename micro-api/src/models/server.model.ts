import {Entity, model, property} from '@loopback/repository';
import { storagePath, MEDIA_URL } from 'src/file';
import {v4 as uuid} from 'uuid';
import {Exclude, Expose} from 'class-transformer';

@model()
export class Server extends Entity {

  static LOGO_URL = MEDIA_URL + 'servers'
  static LOGO_PATH = storagePath('servers');
  
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

  @Exclude()
  @property({
    type: 'string',
    required: true,
  })
  logo_file: string;

  @property({
    type: 'string',
    required: true,
  })
  owner_id: string;
   
  @property.array(String,{
    required: false,
    default: []
  })
  members_id: string[];

  @property({
    type: 'string',
    required: false,
    default: "Server"
  })
  join: string;

  constructor(data?: Partial<Server>) {
    super(data);
  }

  @Expose({name: 'logo_url'})
  get logo_url(): string{
    return process.env.APP_URL+Server.LOGO_URL + '/'+this.logo_file
  }
}
