import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss'],
})

export class AudioComponent {

    public albums: Array<any> = [{
        'albumTrackCount': 270,
        'audioId': 48433269,
        'author': '凤洋有声',
        'intro': '民间灵异悬疑阴阳风水免费听',
        'isFinished': 0,
        'isPaid': false,
        'name': '我的捉鬼往事 | 免费灵异悬疑阴阳风水',
        'playCount': 13698200,
        'url': 'audio/source/48433269/1',
    },
    {
        'albumTrackCount': 1324,
        'audioId': 26478515,
        'author': '音君而遇文化传媒',
        'intro': '一个把江湖搅得乌烟瘴气的疯子',
        'isFinished': 1,
        'isPaid': false,
        'name': '老街中的痞子（免费）',
        'playCount': 727138136,
        'url': 'audio/source/26478515/1',
    },
    {
        'albumTrackCount': 2360,
        'audioId': 26438796,
        'author': '果维听书',
        'intro': '他银针渡人,术法渡魂,成就济世仁心',
        'isFinished': 1,
        'isPaid': false,
        'name': '都市奇门医圣（果维福利免费版）',
        'playCount': 2018867810,
        'url': 'audio/source/26438796/1',
    }]

    public constructor() { }

    public async loadMoreData(event: { target: IonInfiniteScroll }): Promise<void> {
        await event.target.complete();
    }
}
