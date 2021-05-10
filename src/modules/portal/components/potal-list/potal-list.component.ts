import { Component } from '@angular/core';

@Component({
    selector: 'app-potal-list',
    templateUrl: './potal-list.component.html',
    styleUrls: ['./potal-list.component.scss'],
})

export class PotalListComponent {

    public audio?: HTMLAudioElement;

    public playMusic(): void {
        if (this.audio) {
            this.audio.currentTime = 0;
        } else {
            this.audio = new Audio();
            this.audio.src = 'https://aod.cos.tx.xmcdn.com/group72/M04/41/AF/wKgO0F4lfeTAnAnOAKsbpMyVdhs568.m4a';
        }
        this.audio.play().catch();
    }

    public continueMusic(): void {
        this.audio?.play().catch();
    }

    public stopMusic(): void {
        this.audio.pause();
    }
}
