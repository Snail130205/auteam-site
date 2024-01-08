import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {MainService} from "../../services/main.service";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {find} from "rxjs";

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    TranslateModule
  ],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit {
  private readonly _mainService: MainService = inject(MainService);

  public mainPage: string = '';
  public newsDetail: any;

  constructor(private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute) {
  }
  public ngOnInit(): void {
    this.mainPage = this._router.url.indexOf('news') !== -1 ? '/news' : '/main';
    this._mainService.news$.subscribe((news) => {
      if (news.length) {
        this._mainService.newsDetail$
          .subscribe(res => {
            if (res) {
              this.newsDetail = res;
            } else {
              this._activatedRoute.paramMap.subscribe((params) => {
                const newsId: string | null = params.get('id');
                if (newsId) {
                  const newsInfo: any = news.find(item => item.id === newsId);
                  if (newsInfo) {
                    this.newsDetail = newsInfo;
                  } else {
                    if (typeof newsInfo === 'undefined') {
                      this._router.navigate(['/**']);
                    }
                  }
                }
              });
            }
          });
      }
    });
  }

}
