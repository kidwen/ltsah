import { AfterContentInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumInfo, HttpService, InteractionService, Track } from '@kidwen/shared';
import { MusicService } from '@kidwen/shared';

@Component({
    selector: 'app-audio-list',
    templateUrl: './audio-list.component.html',
    styleUrls: ['./audio-list.component.scss'],
})

export class AudioListComponent implements AfterContentInit {
    public audios?: Array<Track>;

    private audioId?: string;

    private pageNum: Number = 1;

    public constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private interaction: InteractionService,
        private music: MusicService,
    ) {
        this.route.params.subscribe(p => {
            this.audioId = p.id as string;
        });
    }

    public async ngAfterContentInit(): Promise<void> {
        if (this.audioId) {
            let data: { data: AlbumInfo } = await this.http.get<{ data: AlbumInfo }>(`audio/source`, this.audioId, '', { page: this.pageNum.toString() });
            this.audios = data?.data.tracks;
        }
    }

    public play(track: Track): void {
        this.music.play(track.url);
    }

    public continueMusic(): void {
        this.music.audio?.play().catch(error => this.interaction.toast(`播放失败${error}`));
    }

    public pauseMusic(): void {
        this.music.audio?.pause();
    }
}
