import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, PreloadAllModules } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TankModule } from './tank/tank.module';
import { PotalModule } from 'src/modules/portal/portal.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules }),
        IonicModule.forRoot({
            backButtonText: '',
        }),
        TankModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
