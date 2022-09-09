import {MainComponent} from "./main/main.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
