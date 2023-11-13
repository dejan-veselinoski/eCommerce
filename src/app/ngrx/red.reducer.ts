import * as FilterActions from './act.action';
import { FilterModel } from './filter.model';

export function Reducers(state: FilterModel[] = [], action: FilterActions.Actions) {
  switch (action.type) {
    case FilterActions.AddFilterConst:
      return [...state, action.data];
    default:
      return state;
  }
}
