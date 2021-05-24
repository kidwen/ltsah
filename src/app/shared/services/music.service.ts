import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InteractionService } from './interaction.service';

@Injectable({ providedIn: 'root' })
export class MusicService {
    public audio: HTMLAudioElement = new Audio();

    public src?: string;

    public playStatus: boolean = false;

    public sub: Subject<boolean> = new Subject<boolean>();

    public constructor(
        private interaction: InteractionService,
    ) { }

    public play(src?: string): void {
        // 播放中，改变播放音频
        if (this.playStatus && this.src !== src) {
            this.src = src;
            this.audio.src = src;
            this.audio.play().catch(error => this.interaction.toast(`播放失败${error}`));
        }
        // 播放中，未改变音频
        if (this.playStatus && this.src === src) {
            return;
        }
        // 未播放, 改变音频
        if (!this.playStatus && this.src !== src && src) {
            this.src = src;
            this.audio.src = src;
            this.audio.play().catch(error => this.interaction.toast(`播放失败${error}`));
            this.playStatus = !this.playStatus;
            this.sub.next(this.playStatus);
        }
        // 未播放，未改变音频
        if ((!this.playStatus && this.src === src) || (!this.playStatus && this.src && !src)) {
            this.audio.play().catch(error => this.interaction.toast(`播放失败${error}`));
            this.playStatus = !this.playStatus;
            this.sub.next(this.playStatus);
        }
    }

    public stop(): void {
        this.audio.pause();
        this.playStatus = !this.playStatus;
        this.sub.next(this.playStatus);
    }
}
