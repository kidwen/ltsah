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

    public constructor(
        private router: Router,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private pleasureSharedService: PleasureSharedService,
    ) {
        this.channels = this.pleasureSharedService.channels;
    }

    public itemClick(channel: Channel): void {
        this.pleasureSharedService.currentChannel = channel;
        this.router.navigate(['./pleasure'], { relativeTo: this.activatedRoute }).then().catch();
    }
}
