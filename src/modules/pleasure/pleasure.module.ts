import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AudioComponent } from './component/audio/audio.component';
import { ChannelComponent } from './component/channel/channel.component';
import { PleasureComponent } from './component/pleasure/pleasure.component';
import { PleasureRoutingModule } from './pleasure-routing.module';
import { PleasureSharedService } from './services/pleasure-shared.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: '', component: PleasureComponent }]),
        PleasureRoutingModule,
    ],
    declarations: [
        PleasureComponent,
        ChannelComponent,
        AudioComponent,
    ],
    providers: [PleasureSharedService],
})
export class PleasureModule { }
