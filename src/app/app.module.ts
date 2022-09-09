import {APP_INITIALIZER, NgModule, PLATFORM_ID} from '@angular/core';
import {BrowserModule, TransferState, ɵgetDOM} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SanityImagePipe } from './pipes/sanity-image.pipe';
import { InstructorsComponent } from './instructors/instructors.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { CategoriesImagesComponent } from './categories-images/categories-images.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { CoursesComponent } from './courses/courses.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {LanguageInterceptor} from "./interceptors/langauge.interceptor";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {translateBrowserLoaderFactory} from "./core/utils/translate-browser.loader";
import {NgxPageScrollCoreModule} from "ngx-page-scroll-core";
import {NgxPageScrollModule} from "ngx-page-scroll";
import {AppRoutingModule} from "./app-routing.module";
import { ApplyComponent } from './apply/apply.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {ClickOutsideDirective} from "./directives/click-outside.directive";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SanityImagePipe,
    InstructorsComponent,
    HeaderComponent,
    MainComponent,
    CategoriesImagesComponent,
    CoursesComponent,
    ScheduleComponent,
    ApplyComponent,
    FooterComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: function (
        document: HTMLDocument,
        platformId: Object
      ): Function {
        return () => {
          if (isPlatformBrowser(platformId)) {
            const dom = ɵgetDOM();
            const styles: any[] = Array.prototype.slice.apply(
              dom.getDefaultDocument().querySelectorAll(`style[ng-transition]`)
            );
            styles.forEach((el) => {
              // Remove ng-transition attribute to prevent Angular appInitializerFactory
              // to remove server styles before preboot complete
              el.removeAttribute('ng-transition');
            });
            document.addEventListener('PrebootComplete', () => {
              // After preboot complete, remove the server scripts
              setTimeout(() => styles.forEach((el) => dom.remove(el)));
            });
          }
        };
      },
      deps: [DOCUMENT, PLATFORM_ID],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
