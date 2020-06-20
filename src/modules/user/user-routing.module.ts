import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';

const routes: Routes = [{
    path: '',
    component: UserPreviewComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UserRoutingModule { }
