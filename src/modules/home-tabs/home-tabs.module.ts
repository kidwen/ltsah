import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeTabsRoutingModule } from './home-tabs-routing.module';

import { HomeTabsComponent } from './home-tabs.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomeTabsRoutingModule
    ],
    declarations: [
        HomeTabsComponent,
    ]
})
export class HomeTabsModule { }
