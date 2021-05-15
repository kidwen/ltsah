import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from 'src/models';
import { Audio, AudioListResponse } from 'src/models/audio.model';
import { PleasureSharedService } from '../../services/pleasure-shared.service';

@Component({
    selector: 'app-pleasure',
    templateUrl: './pleasure.component.html',
    styleUrls: ['./pleasure.component.scss'],
})
export class PleasureComponent implements OnInit {

    public audioList: Array<Audio> = [];

    public title: string = '喜闻乐见';

    private channel?: Channel;

    private page: number = 1;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private pleasureSharedService: PleasureSharedService,
    ) {

    }

    public ngOnInit(): void {
        this.channel = this.pleasureSharedService.currentChannel;
        this.title = this.channel?.type_name ?? '';
        this.http.get<AudioListResponse>(`${this.channel.url}/${this.page}`).subscribe(r => {
            this.audioList = r.res_data;
        });
    }

    public itemClick(audio: Audio): void {
        this.pleasureSharedService.currentAudio = audio;
        this.router.navigate(['/home/pleasure/audio']).then().catch();
    }
}
