import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        this.notifyOnError(event);
                    }
                },
                err => {
                    if (err instanceof HttpErrorResponse) {
                        this.notifyOnError(err);
                    } else {
                        console.log(err.message)
                    }
                },
            ),
        );
    }

    private notifyOnError(response: HttpResponse<any> | HttpErrorResponse) {
        if (response instanceof HttpErrorResponse) {
            if (response.status === 0) {
                console.log('Could not connect to server!')
            } else {
                console.log(response)
            }
        } else {
            const graqhQLErrors = response.body.errors;
            if (graqhQLErrors && Array.isArray(graqhQLErrors)) {
                const firstCode: string = graqhQLErrors[0].extensions.code;
                if (firstCode === 'FORBIDDEN') {
                } else if (firstCode === 'CHANNEL_NOT_FOUND') {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    console.log(message)
                } else {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    console.log(message)
                }
            }
        }
    }
}
