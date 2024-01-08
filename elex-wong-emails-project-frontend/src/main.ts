import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Logger } from './app/utils/logger';
import { environment } from './environments/environment';

Logger.init(console);

if (environment.mode === "prod" || environment.mode === "production") {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => Logger.error(err));
