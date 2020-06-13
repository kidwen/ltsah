import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTabsComponent } from './home-tabs.component';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomeTabsComponent,
        children: [
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full'
            },
            {
                path: 'tab1',
                loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
            },
            {
                path: 'user',
                loadChildren: () => import('../user/user.module').then(m => m.UserModule)
            },
            {
                path: 'pleasure',
                loadChildren: () => import('../pleasure/pleasure.module').then(m => m.pleasureModule)
            },
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeTabsRoutingModule { }
