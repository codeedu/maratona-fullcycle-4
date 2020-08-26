import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message.model';
import { DefaultCrudRepository } from '@loopback/repository';
import { EsvDataSourceService } from 'src/services/esv-data-source/esv-data-source.service';

@Injectable()
export class MessageRepository extends DefaultCrudRepository<
Message,
typeof Message.prototype.id
> {
constructor(dataSource: EsvDataSourceService) {
  super(Message, dataSource);
}
}

