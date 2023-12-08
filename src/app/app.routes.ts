import { Routes } from '@angular/router';
import {MainPageComponent} from "./entities/components/main-page/main-page.component";
import {NewsComponent} from "./entities/components/news/news.component";
import {OlympiadComponent} from "./entities/components/olympiad/olympiad.component";
import {InformationComponent} from "./entities/components/information/information.component";

export const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'olympiad',
    component: OlympiadComponent,
  },
  {
    path: 'information',
    component: InformationComponent,
  },
];
