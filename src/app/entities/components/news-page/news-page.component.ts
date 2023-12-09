import { Component } from '@angular/core';
import {NewsComponent} from "../news/news.component";

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [
    NewsComponent
  ],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {

}
