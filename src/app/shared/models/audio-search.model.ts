import { AudioInfo } from "./audio-info.model";

export interface AudioSearch {
    audio_list?: Array<AudioInfo>;
    kw?: string;
}
