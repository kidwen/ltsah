import { Component } from '@angular/core';
import { MusicService } from '@kidwen/shared';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent {

    public constructor(
        private music: MusicService,
    ) { }

    public playOrStopEvent(play: boolean): void {
        if (play) {
            this.music.play();
        } else {
            this.music.stop();
        }
    }
}
