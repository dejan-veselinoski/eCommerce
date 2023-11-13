import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilterModel } from './filter.model';

export const FILTER_FEATURE = 'filter';
export const COLLECTION_FEATURE = 'collection';

export const selectFilter =
  createFeatureSelector<ReadonlyArray<FilterModel>>(FILTER_FEATURE);

export const selectCollectionState =
  createFeatureSelector<ReadonlyArray<string>>(COLLECTION_FEATURE);

export const selectFilterCollection = createSelector(
  selectFilter,
  selectCollectionState,
  (filter, collection) => {
    return filter;
  }
);
