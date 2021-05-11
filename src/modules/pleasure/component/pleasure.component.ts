import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pleasure',
    templateUrl: './pleasure.component.html',
    styleUrls: ['./pleasure.component.scss'],
})
export class PleasureComponent implements OnInit {

    public constructor(
        private http: HttpClient,
    ) {

    }

    public ngOnInit(): void {
        this.http.get('audio/all').subscribe();
    }

}
