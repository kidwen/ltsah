import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from '@kidwen/shared';
import { PleasureSharedService } from '../../services/pleasure-shared.service';

@Component({
    selector: 'app-channel',
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.scss'],
})

export class ChannelComponent {
    public channels: Array<Channel> = [];
    public percent: number = 0;

    public statusColorMap: Map<string, string> = new Map([
        ['normal', '#D7D7D7'],
        ['exception', '#D7D7D7'],
        ['success', '#D7D7D7'],
    ]);

    public strokeColor: string = '#505050';

    public constructor(
        private router: Router,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private pleasureSharedService: PleasureSharedService,
    ) {
        this.channels = this.pleasureSharedService.channels;
        setInterval(() => {
            this.percent = this.percent + 1;
        }, 100);
    }

    public itemClick(channel: Channel): void {
        this.pleasureSharedService.currentChannel = channel;
        this.router.navigate(['./pleasure'], { relativeTo: this.activatedRoute }).then().catch();
    }
}
