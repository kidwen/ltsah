import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { PotalModule } from 'src/modules/portal/portal.module';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TankModule } from './tank/tank.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        PotalModule,
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
