import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface AppState {
    activeOrderId: string | null;
    lastCollectionSlug: string | null;
}

export const initialState: AppState = {
    activeOrderId: null,
    lastCollectionSlug: null,
};

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private state: AppState = initialState;
    private readonly stateSubject = new BehaviorSubject<AppState>(initialState);
    loading: Subject<boolean> = new Subject();

    constructor() {
        if (typeof window !== 'undefined') {
            Object.defineProperty(window, 'appState', {
                get: () => this.stateSubject.value,
            });
        }
    }

    setState<T extends keyof AppState>(key: T, value: AppState[T]) {
        this.state[key] = value;
        this.stateSubject.next(this.state);
    }

    select<R>(selector: (state: AppState) => R): Observable<R> {
        return this.stateSubject.pipe(
            map(selector),
            distinctUntilChanged(),
        );
    }
}
