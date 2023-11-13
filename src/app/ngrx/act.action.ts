import { Action } from '@ngrx/store';
import { FilterModel  } from './filter.model';
export const AddFilterConst = '[Add User] Component';
export const DeleteFilterConst = '[Delete User] Component';
export class AddFilter implements Action{
    readonly type= AddFilterConst;
    constructor(public data: FilterModel){}    
}
 
export class DeleteFilter implements Action{
  readonly type = DeleteFilterConst;
    constructor(public id: number){}    
}

export type Actions = AddFilter | DeleteFilter;


