import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PotalListComponent } from './components/potal-list/potal-list.component';
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
    exports: [
        PotalListComponent,
    ],
})
export class PotalModule { }
