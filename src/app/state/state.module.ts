import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './user/user.state';

@NgModule({
    imports: [
        NgxsModule.forRoot([UserState]),
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class StateModule { }
