import { AfterViewInit, Component, Input } from '@angular/core';
import { SearchProductsQuery } from '../../types/predefined-types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product!: SearchProductsQuery['search']['items'][number] | any;
}
