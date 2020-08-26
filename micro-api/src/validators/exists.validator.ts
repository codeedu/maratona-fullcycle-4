import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments, registerDecorator, ValidationOptions } from "class-validator";
import { ModuleRef } from "@nestjs/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: 'exists', async: true })
@Injectable()
export class ExistsValidator implements ValidatorConstraintInterface {

    constructor(
        private moduleRef: ModuleRef,
    ) {}

    async validate(id: string, validationArguments: ValidationArguments): Promise<boolean> {
        if(!id){
            return false;
        }
        const repo = this.getRepository(validationArguments.constraints[0]);
        const entity = await repo.findById(id);
        return entity !== null;
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return `${validationArguments.property} selected is invalid`;
    }

    getRepository(model: string): DefaultCrudRepository<any, any>{
        return this.moduleRef.get(`${model}Repository`);
    }
}

export function Exists(params: any[], validationOptions?: ValidationOptions) {
    return function(object: unknown, propertyName: string):void {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [params],
        validator: ExistsValidator
      });
    };
  }