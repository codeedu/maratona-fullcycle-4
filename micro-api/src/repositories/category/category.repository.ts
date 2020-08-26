import {Injectable} from '@nestjs/common';
import {Category} from "../../models/category.model";
import {EsvDataSourceService} from "../../services/esv-data-source/esv-data-source.service";
import { DefaultCrudRepository } from '@loopback/repository';

@Injectable()
export class CategoryRepository extends DefaultCrudRepository<
    Category,
    typeof Category.prototype.id
    >{
    constructor(
        dataSource: EsvDataSourceService,
    ) {
        super(Category, dataSource);
    }
}
