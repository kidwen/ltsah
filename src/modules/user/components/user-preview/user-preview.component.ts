import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: './user-preview.component.html',
    styleUrls: ['./user-preview.component.scss'],
})
export class UserPreviewComponent implements OnInit {
    public user?: User;

    public constructor(
        @Inject(DOCUMENT) private document: HTMLDocument,
    ) { }

    public ngOnInit(): void {
        this.user = {
            avatarUrl: '',
        };
    }

    public toggleTheme(): void {
        this.document.body.classList.toggle('light');
    }

    public userMain(): void {
        return;
    }
}

export interface User {
    name?: string;
    avatarUrl?: string;
    faceValue?: string;
}
