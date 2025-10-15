/* eslint-disable no-console */
import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const started = Date.now();
  const groupLabel = `[HTTP] ${req.method} ${req.urlWithParams}`;
  console.group(groupLabel);
  console.log('Request:', req);

  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        const elapsed = Date.now() - started;
        console.log('Response:', event);
        console.log(`Status: ${event.status} | Time: ${elapsed}ms`);
        console.groupEnd();
      }
    }),
    catchError(error => {
      const elapsed = Date.now() - started;
      console.error('Error:', error);
      console.log(`Status: ${error.status} | Time: ${elapsed}ms`);
      console.groupEnd();
      return throwError(() => error);
    })

  );
}


export function retryWithDelayInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    retry({ count: 3, delay: 1000 })
  );
}
