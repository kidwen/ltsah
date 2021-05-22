import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AudioInfo, AudioSearch, InteractionService } from '@kidwen/shared';

@Component({
    selector: 'app-potal-list',
    templateUrl: './potal-list.component.html',
    styleUrls: ['./potal-list.component.scss'],
})

export class PotalListComponent {

    public audioUrls: Array<string> = new Array<string>();

    public currentPosition: number = 0;

    public kw?: string;

    public audios?: Array<AudioInfo>;

    public constructor(
        private interaction: InteractionService,
        private httpService: HttpClient,
        private navController: NavController,
        private route: ActivatedRoute,
    ) {
    }

    public async showTrack(audio: AudioInfo): Promise<void> {
        await this.navController.navigateForward([audio.audioId], {relativeTo: this.route});
    }

    public search(kw: string): void {
        this.httpService.get<AudioSearch>(`audio/search/${kw}/1`).subscribe(res => {
            this.audios = res.audio_list;
        });
    }
}
