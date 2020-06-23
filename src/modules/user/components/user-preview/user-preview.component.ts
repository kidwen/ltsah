import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: './user-preview.component.html',
    styleUrls: ['./user-preview.component.scss'],
})
export class UserPreviewComponent implements OnInit {
    public user?: User;

    public ngOnInit(): void {
        this.user = {
            avatarUrl: '',
        };
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
