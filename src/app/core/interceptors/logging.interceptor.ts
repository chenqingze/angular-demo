import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {finalize, tap} from 'rxjs';
import {inject} from '@angular/core';
import {MessageService} from '../services/message.service';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);
    const started = Date.now();
    let ok: string;
    let cloneRequest = req;
    if (req.method === "GET") {
        const time = new Date().getTime().toString();
        cloneRequest = req.clone({
            params: req.params.set("nocache", time),
        });
    }
    return next(cloneRequest)
        .pipe(
            tap({
                // Succeeds when there is a response; ignore other events
                next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
                // Operation failed; error is an HttpErrorResponse
                error: (error) => (ok = 'failed')
            }),
            // Log when response observable either completes or errors
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} ${req.urlWithParams}  ${ok} in ${elapsed} ms.`;
                messageService.add(msg);
                // console.log("Interceptor Logging -->");
                // messageService.messages.forEach(message => console.log)
            })
        );
}


