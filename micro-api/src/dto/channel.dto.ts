import {IsString, IsNotEmpty} from 'class-validator';

export class ChannelDto{

    @IsString()
    @IsNotEmpty()
    name: string;

}