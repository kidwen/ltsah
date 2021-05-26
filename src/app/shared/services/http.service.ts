import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
    public constructor(
        private http: HttpClient,
    ) {
    }

    public async get<T>(url: string, id: string, subId?: string, params?: { [key: string]: string }): Promise<T> {
        return this.http.get<T>(`${url}/${id}${subId ? `/${subId}` : ''}`, { params }).toPromise();
    }
}
