import { Injectable } from '@nestjs/common';
import { DefaultCrudRepository } from '@loopback/repository';
import { Channel } from '../../models/channel.model';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';

@Injectable()
export class ChannelRepository extends DefaultCrudRepository<
  Channel,
  typeof Channel.prototype.id
> {
  constructor(dataSource: EsvDataSourceService) {
    super(Channel, dataSource);
  }
}
