import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GetUser } from './user.action';

export interface UserModel {
    id: string;
}

@Injectable({ providedIn: 'any' })
@State<UserModel>({
    name: 'GetUser',
    defaults: { id: '' },
})
export class UserState {

    @Action(GetUser)
    public getUser(ctx: StateContext<UserModel>, id: string): Observable<void> {

        return of({ id: '123' }).pipe(
            tap(user => {
                ctx.setState(user);
            }),
            map(user => undefined),
            catchError(() => undefined),
        );
    }
}
