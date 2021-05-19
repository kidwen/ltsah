import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AudioInfo, AudioSearch, InteractionService } from '@kidwen/shared';

@Component({
    selector: 'app-potal-list',
    templateUrl: './potal-list.component.html',
    styleUrls: ['./potal-list.component.scss'],
})

export class PotalListComponent {

    public audio?: HTMLAudioElement;

    public audioUrls: Array<string> = new Array<string>();

    public currentPosition: number = 0;

    public kw?: string;

    public audios?: Array<AudioInfo>;

    public constructor(
        private interaction: InteractionService,
        private httpService: HttpClient,
    ) { }

    public playMusic(): void {
        if (this.audio) {
            this.continueMusic();
            return;
        } else {
            this.audio = new Audio();
            this.audio.src = 'https://aod.cos.tx.xmcdn.com/group72/M04/41/AF/wKgO0F4lfeTAnAnOAKsbpMyVdhs568.m4a';
        }
        this.audio.play().catch(error => this.interaction.toast(`播放失败${error}`));
    }

    public continueMusic(): void {
        this.audio?.play().catch(error => this.interaction.toast(`播放失败${error}`));
    }

    public pauseMusic(): void {
        this.audio?.pause();
    }

    public nextMusic(): void {
        if (this.currentPosition >= this.audioUrls.length) {
            return;
        }
        this.audio.src = this.audioUrls[this.currentPosition + 1];
        this.audio.play().catch(error => this.interaction.toast(`播放失败${error}`));
    }

    public showAudioList(): void {
        //  TODO: interaction to show audio list
    }

    public search(kw: string): void {
        this.httpService.get<AudioSearch>(`audio/search/${kw}/1`).subscribe(res => {
            this.audios = res.audio_list;
        });
    }
}
