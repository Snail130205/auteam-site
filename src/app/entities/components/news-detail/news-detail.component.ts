import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit {
  public mainPage: string = '';

  constructor(private readonly _router: Router) {
  }
  public ngOnInit(): void {
    this.mainPage = this._router.url.indexOf('news') !== -1 ? '/news' : '';
  }

}
