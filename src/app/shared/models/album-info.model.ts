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
