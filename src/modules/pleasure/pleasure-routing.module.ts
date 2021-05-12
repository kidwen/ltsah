import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './component/channel/channel.component';
import { PleasureComponent } from './component/pleasure/pleasure.component';

const routes: Routes = [
    {
        path: '',
        component: ChannelComponent,
    }, {
        path: 'pleasure',
        component: PleasureComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PleasureRoutingModule { }
