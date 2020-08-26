import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Param,
  Post,
  Body,
  Req,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ChannelRepository } from 'src/repositories/channel/channel.repository';
import { Channel } from 'src/models/channel.model';
import { ChannelDto } from 'src/dto/channel.dto';
import { CategoryRepository } from 'src/repositories/category/category.repository';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('channel')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories/:category_id/channels')
export class ChannelController {
  constructor(
    private channelRepo: ChannelRepository,
    private categoryRepo: CategoryRepository,
  ) {}
  @ApiBearerAuth()
  @Get()
  index(
    @Param('category_id') categoryId: string,
    @Req() request: { user: any },
  ): Promise<Channel> {
    this.validateMember(request.user.sub, categoryId);
    //@ts-ignore
    return this.channelRepo.find({
      //@ts-ignore
      where: {
        ...this.byMember(request.user.sub, categoryId),
      },
    });
  }

  @ApiBearerAuth()
  @Post()
  store(
    @Param('category_id') categoryId: string,
    @Req() request: { user: any },
    @Body() body: ChannelDto,
  ): Promise<Channel> {
    this.validateOwner(request.user.sub, categoryId);
    return this.channelRepo.create({
      ...body,
      join: {
        name: 'Channel',
        parent: categoryId,
      },
    });
  }

  @ApiBearerAuth()
  @Get(':channel_id')
  async show(
    @Param() params: { category_id: string; channel_id: string },
    @Req() request: { user: any },
  ): Promise<Channel> {
    this.validateMember(request.user.sub, params.category_id);
    return this.channelRepo.findOne({
      where: {
        ...this.byMember(request.user.sub, params.category_id),
        id: params.channel_id,
      },
    });
  }

  private byMember(userId, categoryId){
    return {
      has_parent: {
        parent_type: 'Category',
        query: {
          bool: {
            must: [
              {
                has_parent: {
                  parent_type: 'Server',
                  query: {
                    match: {
                      members_id: userId,
                    },
                  },
                },
              },
              {
                match: {
                  id: categoryId,
                },
              },
            ],
          },
        },
      },
    }
  }

  private async validateOwner(userId, categoryId) {
    const category = this.categoryRepo.findOne({
      where: {
        //@ts-ignore
        has_parent: {
          parent_type: 'Server',
          query: {
            match: {
              owner_id: userId,
            },
          },
        },
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException();
    }
  }

  private async validateMember(userId, categoryId) {
    const category = this.categoryRepo.findOne({
      where: {
        //@ts-ignore
        has_parent: {
          parent_type: 'Server',
          query: {
            match: {
              members_id: userId,
            },
          },
        },
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException();
    }
  }
}
