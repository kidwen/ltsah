import { Track } from './track.model';

export interface AlbumInfo {
    albumId?: string;
    currentUid?: string;
    lastPlayTrackId?: string;
    pageNum?: number;
    pageSize?: number;
    sort?: number;
    superior?: Array<any>;
    trackTotalCount?: number;
    tracks?: Array<Track>;
}

export interface AlbumListResponse {
    pageNum: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    audio_list: Array<Album>;
    typeNum: number;
    pageSize: number;
}

export interface Album {
    albumTrackCount: number;
    audioId: number;
    author: string;
    intro: string;
    isFinished: number;
    isPaid: boolean;
    name: string;
    playCount: number;
    url: string;
}
