import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        UserRoutingModule,
    ],
    declarations: [
        UserPreviewComponent,
    ],
})
export class UserModule { }
