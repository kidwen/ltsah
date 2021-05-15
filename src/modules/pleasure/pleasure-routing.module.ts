import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './component/audio/audio.component';
import { ChannelComponent } from './component/channel/channel.component';
import { PleasureComponent } from './component/pleasure/pleasure.component';

const routes: Routes = [
    {
        path: '',
        component: ChannelComponent,
    }, {
        path: 'pleasure',
        component: PleasureComponent,
    }, {
        path: 'audio',
        component: AudioComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PleasureRoutingModule { }
