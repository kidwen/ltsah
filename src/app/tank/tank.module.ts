import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const lazyModules: Routes = [{
    path: 'potal',
    loadChildren: () => import('../../modules/portal/portal.module').then(m => m.PotalModule),
}, {
    path: 'user',
    loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule),
}];

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
}, {
    path: 'login',
    component: LoginComponent,
}, {
    path: 'home',
    component: HomeComponent,
}, ...lazyModules, {
    path: '**',
    redirectTo: 'home',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        LoginComponent,
        HomeComponent,
    ],
    exports: [],
    providers: [
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
    ],
})
export class TankModule { }
