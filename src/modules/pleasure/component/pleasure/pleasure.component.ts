import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Audio, Channel, HttpService } from '@kidwen/shared';
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
        private http: HttpService,
        private router: Router,
        private pleasureSharedService: PleasureSharedService,
    ) {

    }

    public async ngOnInit(): Promise<void> {
        this.channel = this.pleasureSharedService.currentChannel;
        this.title = this.channel?.type_name ?? '喜闻乐见';
        this.audioList = await this.http.get<Array<Audio>>(`${this.channel.url}`, this.channel.id, '', { page: this.page.toString() });
    }

    public itemClick(audio: Audio): void {
        this.pleasureSharedService.currentAudio = audio;
        this.router.navigate(['/home/pleasure/audio']).then().catch();
    }
}
