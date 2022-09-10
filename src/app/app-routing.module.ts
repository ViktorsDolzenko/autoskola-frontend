import {MainComponent} from "./components/main/main.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RulesComponent} from "./components/rules/rules.component";

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'rules', component: RulesComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // or 'top'
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64], // [x, y] - adjust scroll offset
      onSameUrlNavigation: 'reload'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
