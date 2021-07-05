import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Album, AlbumListResponse, Audio, InteractionService } from '@kidwen/shared';
import { Observable } from 'rxjs';
import { PleasureSharedService } from '../../services/pleasure-shared.service';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss'],
})

export class AudioComponent {

    public albums: Array<Album> = [];

    public title: string = '';

    private resourceName: string = 'audio/channel';

    private audio: Audio;
    private page: number = 1;
    private maxPage?: number;

    public constructor(
        private router: Router,
        private interaction: InteractionService,
        private http: HttpClient,
        private pleasureSharedService: PleasureSharedService,
    ) {
        this.audio = this.pleasureSharedService.currentAudio;
        this.title = this.audio.model_name ?? '喜闻乐见';
        this.getData().subscribe(res => {
            this.albums = res.audio_list;
            this.maxPage = res.pageSize;
        });
    }

    public async loadMoreData(event: { target: IonInfiniteScroll }): Promise<void> {
        if (this.maxPage && this.maxPage === this.page) {
            setTimeout(async () => {
                await this.interaction.toast('已经到底了😊');
                await event.target.complete();
            }, 500);
            return;
        }
        this.page += 1;
        this.getData().subscribe(async r => {
            this.albums = [...this.albums, ...r.audio_list];
            await event.target.complete();
        });
    }

    public cardClick(album: Album): void {
        this.router.navigate([`home/potal/${album.audioId}`]).then().catch();
    }

    private getData(): Observable<AlbumListResponse> {
        return this.http.get<AlbumListResponse>(`${this.resourceName}/${this.audio.relationMetadataValueId}/${this.page}`);
    }
}
