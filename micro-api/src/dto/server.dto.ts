import {IsString, IsNotEmpty} from 'class-validator';

export class ServerDto{

    @IsString()
    @IsNotEmpty()
    name: string;


}