import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EsvDataSourceService } from './services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { ServerController } from './controllers/server/server.controller';
import { CommandsModule } from './commands/commands.module';
import { ServerRepository } from './repositories/server/server.repository';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryController } from './controllers/category/category.controller';
import { ExistsValidator } from './validators/exists.validator';
import { CategoryRepository } from './repositories/category/category.repository';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repositories/user/user.repository';
import KeycloakModule, { AuthGuard } from 'nestjs-keycloak-admin';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakUserService } from './services/keycloak-user/keycloak-user.service';
import { ChannelController } from './controllers/channel/channel.controller';
import { ChannelRepository } from './repositories/channel/channel.repository';
import { WebsocketService } from './services/websocket/websocket.service';
import { MessageRepository } from './repositories/message/message.repository';
import { MessageController } from './controllers/message/message.controller';
import { MEDIA_DIR } from './file';
import { MemberController } from './controllers/member/member.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommandsModule,
    MulterModule.register({
      dest: MEDIA_DIR,
    }),
    KeycloakModule.registerAsync({
      useFactory: () => {
        const keycloakConfig = JSON.parse(process.env.KEYCLOAK_JSON);
        return {
          baseUrl: keycloakConfig['auth-server-url'],
          realmName: keycloakConfig['realm'],
          clientId: keycloakConfig['resource'],
          clientSecret: keycloakConfig['credentials']['secret'],
        };
      },
    }),
  ],
  controllers: [
    AppController,
    ServerController,
    CategoryController,
    UserController,
    ChannelController,
    MessageController,
    MemberController,
  ],
  providers: [
    AppService,
    EsvDataSourceService,
    ServerRepository,
    CategoryRepository,
    UserRepository,
    ExistsValidator,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    KeycloakUserService,
    ChannelRepository,
    WebsocketService,
    MessageRepository,
  ],
})
export class AppModule {}
//Loopback Framework - 