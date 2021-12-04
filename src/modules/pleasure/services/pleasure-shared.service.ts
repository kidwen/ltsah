/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Audio, Channel } from '@kidwen/shared';

@Injectable({ providedIn: 'root' })
export class PleasureSharedService {
    public channels: Array<Channel> = [
        {
            id: '7',
            type_name: '小说',
            url: 'audio/list',
        },
        {
            id: '9',
            type_name: '相声小品',
            url: 'audio/list',
        },
        {
            id: '13',
            type_name: '娱乐',
            url: 'audio/list',
        },
        {
            id: '17',
            type_name: '人文',
            url: 'audio/list',
        },
        {
            id: '24',
            type_name: '头条',
            url: 'audio/list',
        },
        {
            id: '16',
            type_name: '历史',
            url: 'audio/list',
        },
        {
            id: '26',
            type_name: '投资理财',
            url: 'audio/list',
        },
        {
            id: '22',
            type_name: '健康',
            url: 'audio/list',
        },
        {
            id: '15',
            type_name: '影视',
            url: 'audio/list',
        },
        {
            id: '27',
            type_name: '商业管理',
            url: 'audio/list',
        },
        {
            id: '29',
            type_name: '英语',
            url: 'audio/list',
        },
        {
            id: '12',
            type_name: '少儿教育',
            url: 'audio/list',
        },
        {
            id: '28',
            type_name: '科技',
            url: 'audio/list',
        },
        {
            id: '32',
            type_name: '教育考试',
            url: 'audio/list',
        },
        {
            id: '25',
            type_name: '体育',
            url: 'audio/list',
        },
        {
            id: '30',
            type_name: '小语种',
            url: 'audio/list',
        },
        {
            id: '8',
            type_name: '广播剧',
            url: 'audio/list',
        },
        {
            id: '23',
            type_name: '汽车',
            url: 'audio/list',
        },
    ];
    public currentChannel?: Channel;

    public currentAudio?: Audio;

}
