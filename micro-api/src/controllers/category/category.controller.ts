import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from 'src/dto/category.dto';
import { CategoryRepository } from 'src/repositories/category/category.repository';
import { Category } from 'src/models/category.model';
import { ServerRepository } from 'src/repositories/server/server.repository';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('category')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('servers/:server_id/categories')
export class CategoryController {
  constructor(
    private categoryRepo: CategoryRepository,
    private serverRepo: ServerRepository,
  ) {}

  @ApiBearerAuth()
  @Get()
  async index(
    @Param('server_id') serverId: string,
    @Req() request: { user: any },
  ): Promise<Category> {
    await this.validateMember(serverId, request.user.sub);
    //@ts-ignore
    return this.categoryRepo.find({
      where: {
        //@ts-ignore
        has_parent: {
          parent_type: 'Server',
          query: {
            bool: {
              must: [
                {
                  match: {
                    id: serverId,
                  },
                },
                {
                  match: {
                    members_id: request.user.sub,
                  },
                },
              ],
            },
          },
        },
      },
    });
  }

  private validateMember(serverId, userId) {
    const server = this.serverRepo.findOne({
      where: {
        id: serverId,
        members_id: userId,
      },
    });
    if (!server) {
      throw new NotFoundException();
    }
  }

  @ApiBearerAuth()
  @Post()
  store(
    @Param('server_id') serverId: string,
    @Req() request: { user: any },
    @Body() body: CategoryDto,
  ): Promise<Category> {
    this.validateOwner(request.user.sub, serverId);
    return this.categoryRepo.create({
      ...body,
      join: {
        name: 'Category',
        parent: serverId,
      },
    });
  }

  @ApiBearerAuth()
  @Get(':id')
  async show(
    @Param('id') id: string,
    @Req() request: { user: any },
  ): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: {
        //@ts-ignore
        has_parent: {
          parent_type: 'Server',
          query: {
            match: {
              members_id: request.user.sub,
            },
          },
        },
        id,
      },
    });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  private async validateOwner(userId, serverId) {
    const server = this.serverRepo.findOne({
      where: {
        owner_id: userId,
        id: serverId,
      },
    });
    if (!server) {
      throw new NotFoundException();
    }
  }
}
