import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../services/data.service';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Store } from '@ngrx/store';
import * as FilterActions from './../ngrx/act.action';
import { FilterModel } from '../ngrx/filter.model';
import { GET_COLLECTIONS } from '../shared/types/results';
import { of } from 'rxjs';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let mockDataService: any;
  let mockStore: any;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj(['query']);
    mockStore = jasmine.createSpyObj(['dispatch', 'select']);

    TestBed.configureTestingModule({
      declarations: [LandingComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Store, useValue: mockStore },
      ],
    });

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getCollections', () => {
    it('should fetch collections and update productList', () => {
      const mockCollections: any = { items: [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }] };
      mockDataService.query.and.returnValue(of({ collections: mockCollections }));

      component.getCollections();

      expect(component.categoryList).toEqual(mockCollections.items);
      expect(component.loading).toBe(false);
    });
  });

  describe('removeProductFilters', () => {
    it('should dispatch AddFilter action with empty filter', () => {
      component.removeProductFilters();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new FilterActions.AddFilter({ ids: [], search: '', category: '' })
      );
    });
  });
});
