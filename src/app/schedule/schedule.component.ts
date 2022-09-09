import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {SanityService} from "../../services/sanity-service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  public schedules$: Observable<any>

  constructor(private sanityService: SanityService) {
    this.schedules$ = this.sanityService.fetch<any[]>(
      `*[_type == "schedule"]{
        from,
        to,
        dayType,
        weekDays,
        address,
        lessonsCount,
        language
      }`
    )
  }
}
