import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/models';
import { PleasureSharedService } from '../../services/pleasure-shared.service';

@Component({
    selector: 'app-pleasure',
    templateUrl: './pleasure.component.html',
    styleUrls: ['./pleasure.component.scss'],
})
export class PleasureComponent implements OnInit {

    private channel?: Channel;

    private page: number = 1;

    public constructor(
        private http: HttpClient,
        private pleasureSharedService: PleasureSharedService,
    ) {

    }

    public ngOnInit(): void {
        this.channel = this.pleasureSharedService.currentChannel;
        this.http.get(`${this.channel.url}/${this.page}`).subscribe(r => {
            console.info(r);
        });
    }
}
