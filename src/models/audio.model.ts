export interface AudioListResponse {
    pageNum: number;
    res_data: Array<Audio>;
    typeNum: number;
}

export interface Audio {
    model_name: string;
}
