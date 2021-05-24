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
        let musicChange: boolean = false;
        if (this.src !== src) {
            this.audio.src = src;
            musicChange = true;
        }
        this.audio.play().catch(error => this.interaction.toast(`播放失败${error}`));
        this.src = src;
        this.playStatus = musicChange ?? !this.playStatus;
        this.sub.next(this.playStatus);
    }

    public stop(): void {
        this.audio.pause();
        this.playStatus = !this.playStatus;
        this.sub.next(this.playStatus);
    }
}
