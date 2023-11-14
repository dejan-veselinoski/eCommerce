import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute } from '@angular/router';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let mockDataService: any;
  let mockStateService: any;
  let mockActiveService: any;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj(['query', 'mutate']);
    mockStateService = jasmine.createSpyObj(['select', 'setState']);
    mockActiveService = jasmine.createSpyObj(['activeOrder$']);
    mockActivatedRoute = {
      paramMap: of({
        get: jasmine.createSpy().and.returnValue('test-slug')
      })
    };

    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('subscribeToProductData', () => {
    it('should subscribe to product data', () => {
      const mockProductData = { product: { } };
      mockDataService.query.and.returnValue(of(mockProductData));
      mockStateService.select.and.returnValue(of('last-collection-slug'));

      component.subscribeToProductData();

      expect(component.product).toEqual(mockProductData.product);
    });
  });

  describe('addToCart', () => {
    it('should add the product variant to the cart', () => {
      const mockVariant : any= { id: 'variant-id' };
      const mockQuantity = 2;
      const mockAddToCartResponse = { addItemToOrder: { __typename: 'Order', id: 'order-id' } };
      mockDataService.mutate.and.returnValue(of(mockAddToCartResponse));

      component.addToCart(mockVariant, mockQuantity);

      expect(mockStateService.setState).toHaveBeenCalledWith('activeOrderId', 'order-id');
    });
  });

  describe('getMostRelevantCollection', () => {
    it('should return the most relevant collection', () => {
      const mockCollections: any = [
        { slug: 'collection-1', breadcrumbs: ['breadcrumb-1'] },
        { slug: 'collection-2', breadcrumbs: ['breadcrumb-2', 'breadcrumb-3'] }
      ];
      const mockLastCollectionSlug = 'collection-1';

      const result = component.getMostRelevantCollection(mockCollections, mockLastCollectionSlug);

      expect(result).toEqual(mockCollections[0]);
    });
  });
});
