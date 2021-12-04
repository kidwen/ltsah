import { AudioInfo } from './audio-info.model';

export interface AudioSearch {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    audio_list?: Array<AudioInfo>;
    kw?: string;
}
