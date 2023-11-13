import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { FacetWithValues } from 'src/app/shared/Interfaces';
import { SearchProductsQuery } from 'src/app/shared/types/predefined-types';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent {

  @Input() activeFacetValueIds: string[] = [];
  @Input() idValues!: SearchProductsQuery['search']['facetValues'] | null;
  @Input() totalResults = 0;

  facets!: FacetWithValues[];

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
     private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
      if ('idValues' in changes) {
          this.facets = this.groupFacetValues(this.idValues);
      }
  }

  isActive(facetValueId: string): boolean {
      return this.activeFacetValueIds.includes(facetValueId);
  }

  toggleFacetValueIdInRoute(id: string) {
    this.stateService.loading.next(true);
    this.router.navigate(['./', {
        facets: this.toggleFacetValueId(id),
    }], {
        queryParamsHandling: 'merge',
        relativeTo: this.route,
        state: {
            noScroll: true,
        },
    });
  }

  unselectFacetValueIdInRoute(values: Array<any>) {
    values.forEach(el => {
      this.activeFacetValueIds = this.activeFacetValueIds.filter(x => x !== el.id)
    })

    this.router.navigate(['./', {
      facets: this.activeFacetValueIds,
    }], {
        queryParamsHandling: 'merge',
        relativeTo: this.route,
        state: {
            noScroll: true,
        },
    });
  }

  toggleFacetValueId(id: string): string[] {
      const existing = this.activeFacetValueIds;
      return existing.includes(id) ? existing.filter(x => x !== id) : existing.concat(id);
  }

  trackById(index: number, item: { id: string }) {
      return item.id;
  }

  private groupFacetValues(facetValues: SearchProductsQuery['search']['facetValues'] | null): FacetWithValues[] {
      if (!facetValues) {
          return [];
      }
      const activeFacetValueIds = this.activeFacetValueIds;
      const facetMap = new Map<string, FacetWithValues>();
      for (const { count, facetValue: { id, name, facet } } of facetValues) {
          if (count === this.totalResults && !activeFacetValueIds.includes(id)) {
              continue;
          }
          const facetFromMap = facetMap.get(facet.id);
          if (facetFromMap) {
              facetFromMap.values.push({ id, name, count });
          } else {
              facetMap.set(facet.id, { id: facet.id, name: facet.name, values: [{ id, name, count }]});
          }
      }
      return Array.from(facetMap.values());
  }
}
