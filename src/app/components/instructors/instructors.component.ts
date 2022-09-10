import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {SanityService} from "../../../services/sanity-service";

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent  {

  public instructors$: Observable<any>

  constructor(private sanityService: SanityService ) {
    this.instructors$ = this.sanityService.fetch<any[]>(
      `*[_type == "instructors"]{
        name,
        price,
        photo,
        categories,
        location,
        transport,
        languages
      }`
    )
  }
}
