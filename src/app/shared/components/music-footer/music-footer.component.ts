import { Component, Input } from '@angular/core';
import { MusicService } from '../../services';

@Component({
    selector: 'app-music-footer',
    templateUrl: './music-footer.component.html',
    styleUrls: ['./music-footer.component.scss'],
})

export class MusicFooterComponent {
    @Input()
    public percent: number = 0;

    @Input()
    public avatar: string = 'https://avatars.githubusercontent.com/u/38277891?s=60&v=4';

    @Input()
    public name: string = '正在播放';

    public playStatus: boolean = false;

    public constructor(
        private music: MusicService,
    ) {
        this.music.sub.subscribe(r => {
            this.playStatus = r;
        });
    }

    public playOrStop(): void {
        if (!this.music.src) {
            return;
        }
        if (this.playStatus) {
            this.music.stop();
        } else {
            this.music.play();
        }
    }
}
