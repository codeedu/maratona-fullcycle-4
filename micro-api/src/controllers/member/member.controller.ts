import { Controller, Get, Param, Post, HttpCode, Req, NotFoundException, UnprocessableEntityException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { ServerRepository } from 'src/repositories/server/server.repository';
import { UserRepository } from 'src/repositories/user/user.repository';
import { Server } from 'src/models/server.model';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('member')
@Controller('servers/:server_id/members')
export class MemberController {
  constructor(
    private serverRepo: ServerRepository,
    private userRepo: UserRepository,
  ) {}

  @ApiBearerAuth()
  @Get()
  async index(@Param('server_id') id: string, @Req() request: {user: any}): Promise<User[]> {
    const server = await this.serverRepo.findOne({
      where: {
        id,
        //@ts-ignore
        members_id: request.user.sub
      },
    });
    if(!server){
        throw new NotFoundException()
    }
    return this.userRepo.find({
      where: {
        or: server.members_id.map(memberId => ({ id: memberId })),
      },
    });
  }

  @ApiBearerAuth()
  @Post(':member_id')
  @HttpCode(204)
  async store(
    @Param() params: { server_id: string; member_id: string },
  ): Promise<void> {
    const server = await this.serverRepo.findOne({
      where: { id: params.server_id },
    });
    if(!server){
        throw new NotFoundException()
    }
    if(this.hasMember(server, params.member_id)){
        throw new UnprocessableEntityException();
    }
    await this.serverRepo.updateById(params.server_id, {
      members_id: [...server.members_id, params.member_id],
    });
  }

  private hasMember(server: Server, memberId){
    return server.members_id.indexOf(memberId)
  }
}
