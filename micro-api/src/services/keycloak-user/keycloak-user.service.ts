import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user/user.repository';
import { KeycloakService } from 'nestjs-keycloak-admin';
import { User } from 'src/models/user.model';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';
import { UserQuery } from 'keycloak-admin/lib/resources/users';

@Injectable()
export class KeycloakUserService {
  constructor(
    private userRepo: UserRepository,
    private keyCloakService: KeycloakService,
  ) {}

  async create(data: {
    name: string;
    email: string;
    password: string;
    photo_file: string;
  }): Promise<User> {
    const remoteUser = this.keyCloakService.client.users;

    const result = await remoteUser.create({
      firstName: data.name,
      username: data.email,
      email: data.email,
      credentials: [{ value: data.password }],
      enabled: true,
    });

    const userRepresentation: UserRepresentation = await remoteUser.findOne(
      result,
    );
    const user = new User({
      id: userRepresentation.id,
      name: userRepresentation.firstName,
      email: userRepresentation.email,
      photo_file: data.photo_file,
    });
    return this.userRepo.create(user);
  }

  async delete(id: string): Promise<void> {
    return this.keyCloakService.client.users.del({ id });
  }

  async findOne(query: UserQuery): Promise<UserRepresentation | null> {
    const users = await this.keyCloakService.client.users.find(query);
    return users.length ? users[0] : null;
  }
}
