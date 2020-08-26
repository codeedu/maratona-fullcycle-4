import {Injectable} from '@nestjs/common';
import {Server} from "../../models/server.model";
import {EsvDataSourceService} from "../../services/esv-data-source/esv-data-source.service";
import { DefaultCrudRepository } from '@loopback/repository';

@Injectable()
export class ServerRepository extends DefaultCrudRepository<
    Server,
    typeof Server.prototype.id
    >{
    constructor(
        dataSource: EsvDataSourceService,
    ) {
        super(Server, dataSource);
    }
}
