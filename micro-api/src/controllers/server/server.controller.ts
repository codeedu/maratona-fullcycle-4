import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UnprocessableEntityException,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { ServerRepository } from '../../repositories/server/server.repository';
import { Server } from '../../models/server.model';
import { ServerDto } from '../../dto/server.dto';
import { imageValidator } from '../../validators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { hashFilename } from '../../file';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('server')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('servers')
export class ServerController {
  constructor(private serverRepo: ServerRepository) {}

  @ApiBearerAuth()
  @Get()
  index(@Req() request: { user: any }): Promise<Server[]> {
    const userId = request.user.sub;
    return this.serverRepo.find({
      where: {
        or: [{ members_id: userId }],
      },
    });
  }

  @ApiBearerAuth()
  @Get(':id')
  show(@Param('id') id: string): Promise<Server> {
    return this.serverRepo.findOne({
      fields: {
        members_id: false,
      },
      where: {
        id,
      },
    });
  }

  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('logo', {
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: imageValidator,
      storage: diskStorage({
        destination: Server.LOGO_PATH,
        filename: hashFilename,
      }),
    }),
  )
  @Post()
  store(
    @Req() req: { user: any },
    @Body() body: ServerDto,
    @UploadedFile() logo: { filename: string },
  ): Promise<Server> {
    if (!logo) {
      throw new UnprocessableEntityException('Missing logo file');
    }
    return this.serverRepo.create({
      ...body,
      logo_file: logo.filename,
      owner_id: req.user.sub,
      members_id: [req.user.sub],
    });
  }
}
