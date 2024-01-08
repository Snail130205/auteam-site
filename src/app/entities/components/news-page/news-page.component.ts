import {Component, inject, OnInit} from '@angular/core';
import {NewsComponent} from "../news/news.component";
import {PaginationComponent} from "../pagination/pagination.component";
import {TranslateModule} from "@ngx-translate/core";
import {MainService} from "../../services/main.service";
import {IInformationTab} from "../../interfaces/information-tab.interface";
import {MainLib} from "../../libs/main.lib";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [
    NewsComponent,
    PaginationComponent,
    TranslateModule,
    NgIf
  ],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent implements OnInit {
  private readonly _mainService: MainService = inject(MainService);

  public totalPages: number = 1;
  public current: number = 1;
  public news: any[] = [];

  public ngOnInit(): void {
    this._mainService.news$.subscribe((res) => {
      if (res.length) {
        this.news = res;
        this.totalPages = Math.ceil(res.length / 5);
      }
    });
  }

  public goTo(page: number): void {
    this.current = page;

  }

  public next(page: number): void {
    this.current += 1;
  }

  public previous(page: number): void {
    this.current -= 1;
  }

  public getNewsForPage(page: number): any[] {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    return this.news.slice(startIndex, endIndex);
  }
}

