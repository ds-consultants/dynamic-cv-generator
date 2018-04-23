import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

/// Notify users about errors and other helpful stuff

@Injectable()
export class NotifyService {

    private _msgSource = new Subject<String | null>();

    msg = this._msgSource.asObservable();

    update(content: string) {
        const msg: String = content;
        this._msgSource.next(msg);
    }

    clear() {
        this._msgSource.next(null);
    }
}
