import { Injectable } from '@nestjs/common';
import { MEDIA_DIR } from 'src/file';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import { Server } from 'src/models/server.model';
import { ServerRepository } from 'src/repositories/server/server.repository';
import { UserRepository } from 'src/repositories/user/user.repository';

@Injectable()
export class ServerFixtureService {
  constructor(
    private serverRepo: ServerRepository,
    private userRepo: UserRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(data: { name: string; logo_file: string; user: string }) {
    if (!existsSync(join(MEDIA_DIR, 'servers'))) {
      mkdirSync(join(MEDIA_DIR, 'servers'));
    }
    copyFileSync(
      join(`${process.cwd()}`, 'media-fake', data.logo_file),
      join(Server.LOGO_PATH, data.logo_file),
    );
    const user = await this.userRepo.findOne({ where: { email: data.user } });
    return this.serverRepo.create({
      name: data.name,
      logo_file: data.logo_file,
      owner_id: user.id,
      members_id: [user.id],
    });
  }
}
