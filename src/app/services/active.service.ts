import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetActiveOrderQuery } from '../shared/types/predefined-types';
import { DataService } from './data.service';
import { GET_ACTIVE_ORDER } from '../shared/types/results';

@Injectable({
    providedIn: 'root'
})
export class ActiveService {

    activeOrder$: Observable<GetActiveOrderQuery['activeOrder']>;

    constructor(private dataService: DataService) {
        this.activeOrder$ = this.dataService.query<GetActiveOrderQuery>(GET_ACTIVE_ORDER).pipe(map(({activeOrder}) => activeOrder));
    }
}
