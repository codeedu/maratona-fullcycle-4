import {Injectable} from '@nestjs/common';
import {User} from "../../models/user.model";
import {EsvDataSourceService} from "../../services/esv-data-source/esv-data-source.service";
import { DefaultCrudRepository } from '@loopback/repository';

@Injectable()
export class UserRepository extends DefaultCrudRepository<
    User,
    typeof User.prototype.id
    >{
    constructor(
        dataSource: EsvDataSourceService,
    ) {
        super(User, dataSource);
    }
}
