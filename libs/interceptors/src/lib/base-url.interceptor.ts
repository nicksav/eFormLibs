import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs';

import { ModuleOptions } from './module-options';
import { OPTIONS } from './options';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private get _dealerId(): string {
    return this._storageService.get('dealerId').toString();
  }

  constructor(
    private _storageService: LocalStorageService,
    @Inject(OPTIONS) private _options: ModuleOptions
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = this._prepareUrl(request.url);
    request = request.clone({ url });

    return next.handle(request);
  }

  private _prepareUrl(url: string): string {
    if (url.includes('<authApi>')) {
      url = url.replace('<authApi>', this._options.authBaseUrl);
    } else if (url.includes('<chatApi>')) {
      url = url.replace('<chatApi>', this._options.chatBaseUrl);
    } else if (url.includes('<batchApi>')) {
      url = url.replace('<batchApi>', this._options.batchApi);
    } else if (url.includes('<dealerApi>')) {
      url = url.replace(
        '<dealerApi>',
        this._options.dealerApi || `${this._options.baseUrl}/api/v1`
      );
    } else if (url.includes('<baseUrl>')) {
      url = url.replace('<baseUrl>', `${this._options.baseUrl}/api/v1`);
    }

    if (url.includes('<dealerId>')) {
      url = url.replace('<dealerId>', this._dealerId);
    }

    return url;
  }
}
