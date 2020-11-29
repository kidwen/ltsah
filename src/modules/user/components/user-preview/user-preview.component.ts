import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user-preview.component.html',
    styleUrls: ['./user-preview.component.scss'],
})
export class UserPreviewComponent implements OnInit {
    public user?: User;

    public num: number = 1;

    public constructor(
        @Inject(DOCUMENT) private document: HTMLDocument,
    ) { }

    public ngOnInit(): void {
        console.log('--hmr 无刷新Init，没有改变的话保存也不刷新');
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
