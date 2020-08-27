import { Console, Command } from 'nestjs-console';
import { ModuleRef } from '@nestjs/core';
import { EsvDataSourceService } from '../../services/esv-data-source/esv-data-source.service';
//@ts-ignore
import { Client } from 'es7';
import fixtures from './json';
import { DefaultCrudRepository } from '@loopback/repository';
import chalk from 'chalk';
import { exec } from 'child_process';
import { MEDIA_DIR } from '../../file';

@Console()
export class FixturesCommand {
  constructor(
    private moduleRef: ModuleRef,
    private dataSource: EsvDataSourceService,
  ) {}

  @Command({
    command: 'fixtures',
    description: 'Seed data in database',
  })
  async command(): Promise<void> {
    await this.preCommand();
    for (const fixture of fixtures) {
      if ('model' in fixture) {
        //@ts-ignore
        await this.processRepository(fixture.model, fixture.fields);
      } else {
        const [serviceClass, method] = fixture.fixture.split('@');
        await this.processService(serviceClass, method, fixture.fields);
      }
    }

    console.log(chalk.green('Documents generated'));
  }

  async preCommand(): Promise<void> {
    await this.deleteAllDocuments();
    exec(`rm -rf ${MEDIA_DIR}/*`);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async processRepository(model: string, data: any): Promise<void> {
    const repository = this.getRepository(model) as DefaultCrudRepository<
      any,
      any
    >;
    await repository.create(data);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async processService(
    serviceClass: string,
    method: string,
    data: any,
  ): Promise<void> {
    const service = this.getService(serviceClass);
    await service[method](data);
  }

  async deleteAllDocuments(): Promise<void> {
    const connector = this.dataSource.adapter;
    const client: Client = this.dataSource.adapter.db;
    await client.deleteByQuery({
      index: connector.settings.index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
  }

  getRepository(name: string): DefaultCrudRepository<any, any> {
    return this.getService(`${name}Repository`) as any;
  }

  getService<T>(name: string): T {
    return this.moduleRef.get(name);
  }
}
