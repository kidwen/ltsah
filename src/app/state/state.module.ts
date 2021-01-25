import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { UserState } from './user/user.state';

@NgModule({
    imports: [
        NgxsModule.forFeature([UserState]),
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class StateModule { }
