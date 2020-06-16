import { NgModule } from '@angular/core';
import { PotalListComponent } from './components/potal-list/potal-list.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PotalRoutingModule } from './portal-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PotalRoutingModule,
    ],
    declarations: [
        PotalListComponent,
    ],
})
export class PotalModule { }
