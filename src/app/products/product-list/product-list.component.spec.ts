import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Apollo } from 'apollo-angular';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockDataService: any;
  let mockStateService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockStore: any;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj(['query']);
    mockStateService = jasmine.createSpyObj(['loading', 'setState']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      paramMap: of({
        get: jasmine.createSpy().and.returnValue('test-slug')
      }),
      queryParamMap: of({
        get: jasmine.createSpy().and.returnValue('test-search')
      })
    };
    mockStore = jasmine.createSpyObj(['select', 'dispatch']);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: Storage, useValue: mockStore },
        Apollo,
      ],
      imports: [ApolloTestingModule],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the component', () => {

      const mockQueryResult = { search: { items: [], totalItems: 0 } };
      mockDataService.query.and.returnValue(of(mockQueryResult));
      component['activeFacetValueIds$'] = of(['facet-1', 'facet-2']);
      component['searchTerm$'] = of('test-search');

      component.ngOnInit();

      expect(component.categoryName).toEqual('test-slug');
      expect(component.unfilteredTotalItems).toEqual(0);
    });
  });

  describe('subscribeToFilters', () => {
    it('should subscribe to filters', () => {
      const mockFacetValues = ['facet-1', 'facet-2'];
      const mockSearchTerm = 'test-search';
      mockActivatedRoute.paramMap.pipe.and.returnValue(of({ get: jasmine.createSpy().and.returnValue(mockFacetValues) }));
      mockActivatedRoute.queryParamMap.pipe.and.returnValue(of({ get: jasmine.createSpy().and.returnValue(mockSearchTerm) }));

      component.subscribeToFilters();

      expect(component['activeFacetValueIds']).toEqual(mockFacetValues);
      expect(component['searchValue']).toEqual(mockSearchTerm);
    });
  });

  describe('checkHistoryValues', () => {
    it('should check history values', () => {
      const mockFilter = { ids: ['facet-3'], search: 'new-search', category: 'new-category' };
      component['isUrlChecked'] = false;
      mockStore.select.and.returnValue(of([mockFilter]));

      component.checkHistoryValues();

      expect(mockRouter.navigate).toHaveBeenCalledWith(
        ['./'],
        {
          queryParamsHandling: 'merge',
          relativeTo: mockActivatedRoute,
          state: {
            noScroll: true,
          },
        }
      );
    });
  });
});
