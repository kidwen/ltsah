export interface ListResponse<T> {
    count: number;
    offset: number;
    limit: number;
    items: Array<T>;
}
