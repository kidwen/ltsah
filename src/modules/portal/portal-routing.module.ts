import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PotalListComponent } from './components/potal-list/potal-list.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: PotalListComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PotalRoutingModule { }
