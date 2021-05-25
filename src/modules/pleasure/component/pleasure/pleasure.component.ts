import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Audio, Channel } from '@kidwen/shared';
import { PleasureSharedService } from '../../services/pleasure-shared.service';

@Component({
    selector: 'app-pleasure',
    templateUrl: './pleasure.component.html',
    styleUrls: ['./pleasure.component.scss'],
})
export class PleasureComponent implements OnInit {

    public audioList: Array<Audio> = [];

    public title: string = '';

    private channel?: Channel;

    private page: number = 1;

    public constructor(
        private http: HttpClient,
        private router: Router,
        private pleasureSharedService: PleasureSharedService,
    ) {

    }

    public ngOnInit(): void {
        this.channel = this.pleasureSharedService.currentChannel;
        this.title = this.channel?.type_name ?? '喜闻乐见';
        this.http.get<Array<Audio>>(`${this.channel.url}/${this.page}`).subscribe(r => {
            this.audioList = r;
        });
    }

    public itemClick(audio: Audio): void {
        this.pleasureSharedService.currentAudio = audio;
        this.router.navigate(['/home/pleasure/audio']).then().catch();
    }
}
