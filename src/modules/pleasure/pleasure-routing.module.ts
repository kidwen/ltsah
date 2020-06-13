import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PleasureComponent } from './pleasure.component';

const routes: Routes = [
    {
        path: '',
        component: PleasureComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PleasureRoutingModule { }
