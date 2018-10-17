import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpringbootInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the new header
    const clonedRequest = request.clone({ 
      headers: request.headers.set('Set-Cookie', 'JSESSIONID=' + this.auth.getJsessionId())
   });

    // Pass control to the next request
    return next.handle(clonedRequest);
  }
}
