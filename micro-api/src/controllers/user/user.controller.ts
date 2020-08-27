import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UnprocessableEntityException,
  UploadedFile,
  Req,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user/user.repository';
import { UserDto } from '../../dto/user.dto';
import { Public } from 'nestjs-keycloak-admin';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageValidator } from '../../validators';
import { diskStorage } from 'multer';
import { hashFilename } from '../../file';
import { KeycloakUserService } from '../../services/keycloak-user/keycloak-user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private userRepo: UserRepository,
    private keyCloakUserService: KeycloakUserService,
  ) {}

  @Public()
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: imageValidator,
      storage: diskStorage({
        destination: User.PHOTO_PATH,
        filename: hashFilename,
      }),
    }),
  )
  @Post()
  async store(
    @Body() body: UserDto,
    @UploadedFile() photo: { filename: string },
  ): Promise<User> {
    if (!photo) {
      throw new UnprocessableEntityException('Missing photo file');
    }
    return this.keyCloakUserService.create({
      ...body,
      photo_file: photo.filename,
    });
  }

  @ApiBearerAuth()
  @Get('me')
  me(@Req() req: { user: any }): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id: req.user.sub,
      },
    });
  }
}