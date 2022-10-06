import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {SanityService} from "../../../services/sanity-service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent{

  public courses$: Observable<any>

  get lang() {
    return localStorage.getItem('lang') || 'lv';
  }

  constructor(private sanityService: SanityService ) {
    this.courses$ = this.sanityService.fetch<any[]>(
      `*[_type == "courses"]{
        nameLv,
        nameRu,
        price,
        newPrice
      }`
    )
  }
}
