import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PleasureComponent } from './component/pleasure.component';
import { PleasureRoutingModule } from './pleasure-routing.module';

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
