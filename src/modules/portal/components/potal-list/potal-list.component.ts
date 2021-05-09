import { Component } from '@angular/core';
// import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { InteractionService } from '@kidwen/shared';

@Component({
    selector: 'app-potal-list',
    templateUrl: './potal-list.component.html',
    styleUrls: ['./potal-list.component.scss'],
})

export class PotalListComponent {

    public audio?: HTMLAudioElement;

    public constructor(
        // private nativeAudio: NativeAudio,
        // private interaction: InteractionService,
    ) { }

    public loadMusic(): void {

        // this.nativeAudio.preloadComplex('uniqueId1', 'https://aod.cos.tx.xmcdn.com/group72/M04/41/AF/wKgO0F4lfeTAnAnOAKsbpMyVdhs568.m4a', 0.5, 1, 0).then(() => this.interaction.toast('load ok'), error => this.interaction.toast(`load failed: ${error}`));
    }

    public playMusic(): void {
        this.audio = new Audio();
        this.audio.src = 'https://aod.cos.tx.xmcdn.com/group72/M04/41/AF/wKgO0F4lfeTAnAnOAKsbpMyVdhs568.m4a';
        this.audio.play();
        // this.nativeAudio.play('uniqueId1').then(() => this.interaction.toast('load ok'), error => this.interaction.toast(`load failed: ${error}`));
    }

    public continueMusic():void{
        this.audio?.play();
    }

    public stopMusic(): void {
        this.audio.pause();
    }
}
