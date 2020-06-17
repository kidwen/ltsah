import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PleasureRoutingModule } from './pleasure-routing.module';
import { PleasureComponent } from './component/pleasure.component';

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
    ],
})
export class PleasureModule { }
