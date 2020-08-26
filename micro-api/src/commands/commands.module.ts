import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { ServerRepository } from 'src/repositories/server/server.repository';
import { EsvDataSourceService } from 'src/services/esv-data-source/esv-data-source.service';
import { ConfigModule } from '@nestjs/config';
import { FixturesCommand } from './fixtures/fixtures.command';
import { UserFixtureService } from './fixtures/user-fixture/user-fixture.service';
import KeycloakModule from 'nestjs-keycloak-admin';
import { UserRepository } from 'src/repositories/user/user.repository';
import { KeycloakUserService } from 'src/services/keycloak-user/keycloak-user.service';
import { ServerFixtureService } from './fixtures/server-fixture/server-fixture.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConsoleModule,
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
  providers: [
    EsvDataSourceService,
    ServerRepository,
    UserRepository,
    FixturesCommand,
    UserFixtureService,
    KeycloakUserService,
    ServerFixtureService,
  ],
})
export class CommandsModule {}
