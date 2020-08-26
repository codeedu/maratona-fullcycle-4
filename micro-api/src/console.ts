import { BootstrapConsole } from 'nestjs-console';
import { CommandsModule } from './commands/commands.module';

const bootstrap = new BootstrapConsole({
    module: CommandsModule,
    useDecorators: true
});
bootstrap.init().then(async app => {
    try {
        await app.init();
        await bootstrap.boot();
        process.exit(0);
    } catch (e) {
        process.exit(1);
    }
});
