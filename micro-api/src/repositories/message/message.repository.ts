import { Injectable } from '@nestjs/common';
import { Message } from '../../models/message.model';
import { DefaultCrudRepository } from '@loopback/repository';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';

@Injectable()
export class MessageRepository extends DefaultCrudRepository<
Message,
typeof Message.prototype.id
> {
constructor(dataSource: EsvDataSourceService) {
  super(Message, dataSource);
}
}

