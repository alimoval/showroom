import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ScrollerService {
  private dataObs$ = new Subject();

  constructor() { }

  getData() {
    return this.dataObs$;
  }

  updateData(data: string) {
    this.dataObs$.next(data);
  }
}
