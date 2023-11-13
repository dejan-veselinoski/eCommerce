import { Component, Input } from '@angular/core';
import { GetCollectionQuery } from '../../types/predefined-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {
  
  @Input() breadcrumbs?: NonNullable<GetCollectionQuery['collection']>['breadcrumbs'] = [];
  @Input() linkLast = false;

  tail<T>(arr: T[] | null): T[] {
      return arr ? arr.slice(1) : [];
  }

  constructor(
    public router: Router,
  ){}
}
