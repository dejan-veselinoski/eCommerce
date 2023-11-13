import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, distinctUntilChanged, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchTerm$!: Observable<string>;

  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.searchTerm$ = this.route.queryParamMap.pipe(
      map(pm => pm.get('search') || ''),
      distinctUntilChanged(),
      shareReplay(1),
  );
  }
}
