import { Component } from '@angular/core';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { NgxsOnInit, StateContext } from '@ngxs/store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent {

    public realTimeHotspot: string = '湖南某聂姓名男子居然是万人迷';

    public constructor(
        private musicControls: MusicControls,
    ) {
    }
    public async ngOnInit(): Promise<void> {
        this.musicControls.create({
            track: 'Time is Running Out',        // optional, default : ''
            artist: 'Muse',                       // optional, default : ''
            cover: 'albums/absolution.jpg',      // optional, default : nothing
            // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
            //           or a remote url ('http://...', 'https://...', 'ftp://...')
            isPlaying: true,                         // optional, default : true
            dismissable: true,                         // optional, default : false

            // hide previous/next/close buttons:
            hasPrev: false,      // show previous button, optional, default: true
            hasNext: false,      // show next button, optional, default: true
            hasClose: true,       // show close button, optional, default: false

            // iOS only, optional
            album: 'Absolution',     // optional, default: ''
            duration: 60, // optional, default: 0
            elapsed: 10, // optional, default: 0
            hasSkipForward: true,  // show skip forward button, optional, default: false
            hasSkipBackward: true, // show skip backward button, optional, default: false
            skipForwardInterval: 15, // display number for skip forward, optional, default: 0
            skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
            hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

            // Android only, optional
            // text displayed in the status bar when the notification (and the ticker) are updated, optional
            ticker: 'Now playing "Time is Running Out"',
            // All icons default to their built-in android equivalents
            playIcon: 'media_play',
            pauseIcon: 'media_pause',
            prevIcon: 'media_prev',
            nextIcon: 'media_next',
            closeIcon: 'media_close',
            notificationIcon: 'notification',
        }).then().catch();

        this.musicControls.subscribe().subscribe(action => {
            function events(action) {
                const message = JSON.parse(action).message;
                switch (message) {
                    case 'music-controls-next':
                        // Do something
                        break;
                    case 'music-controls-previous':
                        // Do something
                        break;
                    case 'music-controls-pause':
                        // Do something
                        break;
                    case 'music-controls-play':
                        // Do something
                        break;
                    case 'music-controls-destroy':
                        // Do something
                        break;

                    // External controls (iOS only)
                    case 'music-controls-toggle-play-pause':
                        // Do something
                        break;
                    case 'music-controls-seek-to':
                        const seekToInSeconds = JSON.parse(action).position;
                        this.musicControls.updateElapsed({
                            elapsed: seekToInSeconds,
                            isPlaying: true
                        });
                        // Do something
                        break;
                    case 'music-controls-skip-forward':
                        // Do something
                        break;
                    case 'music-controls-skip-backward':
                        // Do something
                        break;

                    // Headset events (Android only)
                    // All media button events are listed below
                    case 'music-controls-media-button':
                        // Do something
                        break;
                    case 'music-controls-headset-unplugged':
                        // Do something
                        break;
                    case 'music-controls-headset-plugged':
                        // Do something
                        break;
                    default:
                        break;
                }
            }
        });

        this.musicControls.listen(); // activates the observable above

        this.musicControls.updateIsPlaying(true);
    }
}
