import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { GetCollectionQuery } from 'src/app/shared/types/predefined-types';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {

  @Input() collection?: NonNullable<GetCollectionQuery['collection']>;
  
}
