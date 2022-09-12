import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {animate, style, transition, trigger} from "@angular/animations";
import {PageScrollService} from "ngx-page-scroll-core";
import {DOCUMENT, ViewportScroller} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 250, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 250, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HeaderComponent implements OnInit {
  //@ts-ignore
  public selectedCountryCode: string;
  public bShowToolbarMenu = false;

  constructor(
    private translateService: TranslateService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.selectedCountryCode = localStorage.getItem('lang') || 'lv';
  }

  public changeSelectedCountryCode(value: any): void {
    this.selectedCountryCode = value;
    localStorage.setItem('lang', value);
    this.translateService.use(value);
  }

  public showToolbarMenu() {
    this.bShowToolbarMenu = !this.bShowToolbarMenu;
  }

  public clickedOutside(): void {
    this.bShowToolbarMenu = false;
  }

  onScrollTo(location: string){
    setTimeout(() => { this.router.navigate(['/'], { fragment: location }); }, 300);
  }
}
