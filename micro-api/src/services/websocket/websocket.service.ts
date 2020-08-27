import { UnauthorizedException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { KeycloakService } from 'nestjs-keycloak-admin';
import { RedisClient } from '@nestjs/microservices/external/redis.interface';
import { promisify } from 'util';
import { ServerRepository } from '../../repositories/server/server.repository';
import { MessageRepository } from '../../repositories/message/message.repository';

interface RedisGet {
  (value: string): Promise<string>;
}

interface RedisSet {
  (key: string, value: string): Promise<string>;
}

@WebSocketGateway(0, { namespace: 'channels' })
export class WebsocketService implements OnGatewayConnection {
  @WebSocketServer()
  server;

  constructor(
    private keycloakService: KeycloakService,
    private serverRepo: ServerRepository,
    private messageRepo: MessageRepository,
  ) {}

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    try {
      const token = client.handshake.query.token;
      await this.authenticate(token);
      const userId = await this.getUserId(token);
      const { redisSet } = WebsocketService.redisClient(client);
      await redisSet(client.id, userId);
    } catch (e) {
      client.disconnect(true);
      throw e;
    }
  }

  private async authenticate(token) {
    const sameToken = await this.keycloakService.connect.grantManager.validateAccessToken(
      token,
    );
    if (!(typeof sameToken === 'string')) {
      throw new UnauthorizedException();
    }
  }

  private async getUserId(token) {
    const user: {
      sub: string;
    } = await this.keycloakService.connect.grantManager.userInfo(token);
    return user.sub; //uuid do user no keycloak
  }

  @SubscribeMessage('join')
  async onJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { server_id: string },
  ): Promise<void> {
    const { server_id } = data;
    const { redisGet } = WebsocketService.redisClient(client);
    const userId = await redisGet(client.id);
    const server = await this.serverRepo.findOne({
      where: {
        id: server_id,
        //@ts-ignore
        members_id: userId,
      },
    });

    if (!server) {
      const error = new Error('Not authorized');
      error.name = 'NotAuthorized';
      client.error(error);
      throw error;
    }

    client.join(server_id);
    console.log('join', client.id);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { content: string; channel_id: string },
  ): Promise<void> {
    const { channel_id, content } = data;
    const { redisGet } = WebsocketService.redisClient(client);
    const userId = await redisGet(client.id);
    const server = await this.serverRepo.findOne({
      where: {
        //@ts-ignore
        has_child: {
          type: 'Category',
          query: {
            has_child: {
              type: 'Channel',
              query: {
                match: {
                  id: channel_id,
                },
              },
            },
          },
        },
        //@ts-ignore
        members_id: userId,
      },
    });
    if (!server) {
      const error = new Error('Not authorized');
      error.name = 'NotAuthorized';
      client.error(error);
      throw error;
    }
    const message = await this.messageRepo.create({
      content,
      user_id: userId,
      join: { name: 'Message', parent: channel_id },
    });
    client.emit('new-message', { message });
    client.broadcast.to(server.id).emit('new-message', { message });
    console.log('message sent');
  }

  private static redisClient(client) {
    const redisClient: RedisClient = client.adapter.pubClient;

    const redisGet: RedisGet = promisify(redisClient.get).bind(redisClient);

    const redisSet: RedisSet = promisify(redisClient.set).bind(redisClient);

    return { redisGet, redisSet };
  }
}
