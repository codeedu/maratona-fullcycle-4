import {Entity, model, property} from '@loopback/repository';
import { MEDIA_URL, storagePath } from 'src/file';
import { Exclude, Expose } from 'class-transformer';

@model()
export class User extends Entity {

  static PHOTO_URL = MEDIA_URL + 'users'
  static PHOTO_PATH = storagePath('users');

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @Exclude()
  @property({
    type: 'string',
    required: true,
  })
  photo_file: string;

  constructor(data?: Partial<User>) {
    super(data);
  }

  @Expose({name: 'photo_url'})
  get logo_url(): string{
    return process.env.APP_URL+User.PHOTO_URL + '/'+this.photo_file
  }
}