import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'autobravo';

  constructor(
    private translateService: TranslateService,
    private metaTagService: Meta
  ) {
    this.translateService.setDefaultLang('lv');
    this.translateService.use(localStorage.getItem('lang') || 'lv');
  }

  public ngOnInit() {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Autoskola, Autobravo, braukšana, csdd, autoskolabravo, autoskola bravo',
      },
      { name: 'descriptions', content: 'AutoBravo autoskola A, B Kategorija'},
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Viktors Dolzenko' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-09-10', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },]);
  }
}
