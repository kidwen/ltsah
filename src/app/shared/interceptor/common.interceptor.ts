import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    private basisUrl: string = 'https://www.vision123.site';
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url: string = req.url;
        if (url && url.indexOf('http') !== 0) {
            url = `${this.basisUrl}/${req.url}`;
        }
        const authReq: HttpRequest<any> = req.clone({ url });
        return next.handle(authReq);
    }
}
