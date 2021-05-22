import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AudioListComponent } from './components/audio-list/audio-list.component';
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
        AudioListComponent,
        PotalListComponent,
    ],
    exports: [
        PotalListComponent,
    ],
})
export class PotalModule { }
