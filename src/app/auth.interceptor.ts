import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var jwt = localStorage.getItem('jwt');
        if (jwt !== null && jwt !== '') {
            request = request.clone({
                headers: request.headers.set('X-Auth', jwt)
            });
        }
        return next.handle(request);
    }
}
