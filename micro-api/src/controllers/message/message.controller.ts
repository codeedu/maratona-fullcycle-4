import { Controller, Get, Param, Req } from '@nestjs/common';
import { MessageRepository } from 'src/repositories/message/message.repository';
import { Message } from 'src/models/message.model';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ChannelRepository } from 'src/repositories/channel/channel.repository';

@ApiTags('message')
@Controller('channels/:channel_id/messages')
export class MessageController {
  constructor(
    private messageRepo: MessageRepository,
    private channelRepo: ChannelRepository,
  ) {}

  @ApiBearerAuth()
  @Get()
  async index(@Param('channel_id') channelId: string, @Req() request: {user: any}): Promise<Message[]> {
    await this.validateMember(request.user.sub, channelId);
    return this.messageRepo.find({
      order: ['created_at ASC'],  
      where: {
        //@ts-ignore
        has_parent: {
          parent_type: 'Channel',
          query: {
            match: {
              id: channelId,
            },
          },
        },
      },
    });
  }

  private validateMember(userId, channelId) {
    this.channelRepo.findOne({
      where: {
        //@ts-ignore
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
                    id: channelId,
                  },
                },
              ],
            },
          },
        },
      },
    });
  }
}
