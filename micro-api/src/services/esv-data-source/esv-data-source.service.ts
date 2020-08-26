import { Injectable } from '@nestjs/common';
import { juggler } from '@loopback/repository';
import { ESConnector } from 'loopback-connector-esv6';

@Injectable()
export class EsvDataSourceService extends juggler.DataSource {
  static dataSourceName = 'esv7';

  adapter: ESConnector;


  constructor() {
    super(EsvDataSourceService.config());
  }

  static config(): any {
    return {
      name: 'esv7',
      connector: 'esv6',
      index: 'micro-api',
    
      version: 7,
      debug: process.env.APP_ENV === 'dev',
      defaultSize: 50,
      configuration: {
        node: process.env.ELASTIC_SEARCH_HOST,
        requestTimeout: process.env.ELASTIC_SEARCH_REQUEST_TIMEOUT,
        pingTimeout: process.env.ELASTIC_SEARCH_PING_TIMEOUT,
      },
    

      mappingProperties: {
        id: {
          type: 'keyword',
        },
        owner_id: {
          type: 'keyword',
        },
        user_id: {
          type: 'keyword',
        },
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256,
            },
          },
        },
        email: {
          type: 'keyword',
        },
        logo_file: {
          type: 'keyword',
        },
        photo_file: {
          type: 'keyword',
        },
        join: {
          type: 'join',
          relations:{
            Server: 'Category',
            Category: 'Channel',
            Channel: 'Message'
          }
        },
      },
    };
  }
}
