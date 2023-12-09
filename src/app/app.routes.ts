import { Routes } from '@angular/router';
import {MainPageComponent} from "./entities/components/main-page/main-page.component";
import {NewsComponent} from "./entities/components/news/news.component";
import {OlympiadComponent} from "./entities/components/olympiad/olympiad.component";
import {InformationComponent} from "./entities/components/information/information.component";
import {NewsDetailComponent} from "./entities/components/news-detail/news-detail.component";
import {NewsPageComponent} from "./entities/components/news-page/news-page.component";

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'main/:id',
    component: NewsDetailComponent
  },
  {
    path: 'news',
    component: NewsPageComponent,
  },
  {
    path: 'news/:id',
    component: NewsDetailComponent
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
