import { Injectable } from '@nestjs/common';
import { KeycloakUserService } from 'src/services/keycloak-user/keycloak-user.service';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { MEDIA_DIR } from 'src/file';
import { User } from 'src/models/user.model';
@Injectable()
export class UserFixtureService {
  constructor(private keyCloakUserService: KeycloakUserService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(data: any) {
    if (!existsSync(join(MEDIA_DIR, 'users'))) {
      mkdirSync(join(MEDIA_DIR, 'users'));
    }
    copyFileSync(
      join(`${process.cwd()}`, 'media-fake', data.photo_file),
      join(User.PHOTO_PATH, data.photo_file),
    );
    await this.deleteIfExists(data.email);
    return this.keyCloakUserService.create(data);
  }

  async deleteIfExists(email: string): Promise<void> {
    const user = await this.keyCloakUserService.findOne({ username: email });
    if (user) {
      await this.keyCloakUserService.delete(user.id);
    }
  }
}
