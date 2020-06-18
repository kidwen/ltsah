import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

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
        UserListComponent,
    ],
})
export class UserModule { }
