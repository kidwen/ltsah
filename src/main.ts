import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// tslint:disable-next-line: no-unsafe-any
if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

// Call the element loader after the platform has been bootstrapped
// tslint:disable-next-line: no-floating-promises
defineCustomElements();
