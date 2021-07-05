import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { StateStore } from '@kidwen/state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user-preview.component.html',
    styleUrls: ['./user-preview.component.scss'],
})
export class UserPreviewComponent implements OnInit {

    @Select((state: StateStore) => state.user)
    public user$: Observable<User>;

   public user?: User;

    public num: number = 1;

    public constructor(
        @Inject(DOCUMENT) private document: HTMLDocument,
        private store: Store,
    ) {
        this.store.dispatch((state: StateStore) => state.user);
    }

    public ngOnInit(): void {
        console.error('--hmr 无刷新Init，没有改变的话保存也不刷新');
        this.user = {
            avatarUrl: '',
        };
    }

    public toggleTheme(): void {
        this.document.body.classList.toggle('dark');
    }

    public userMain(): void {
        this.num = this.num + 1;
    }
}

export interface User {
    name?: string;
    avatarUrl?: string;
    faceValue?: string;
}
