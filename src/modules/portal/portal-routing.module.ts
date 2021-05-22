import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioListComponent } from './components/audio-list/audio-list.component';
import { PotalListComponent } from './components/potal-list/potal-list.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: PotalListComponent,
}, {
    path: ':id',
    component: AudioListComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PotalRoutingModule {
}
