import {Component, inject, OnInit} from '@angular/core';
import {IInformationTab} from "../../interfaces/information-tab.interface";
import {MainLib} from "../../libs/main.lib";
import {NgForOf, NgIf} from "@angular/common";
import {NewsComponent} from "../news/news.component";
import {MainService} from "../../services/main.service";
import {PaginationComponent} from "../pagination/pagination.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgForOf,
    NewsComponent,
    PaginationComponent,
    TranslateModule,
    NgIf
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  private readonly _mainService: MainService = inject(MainService);

  public tabs: IInformationTab[] = MainLib.informationTab;
  public totalPages: number = 1;
  public current: number = 1;
  public news: any[] = [];

  public ngOnInit(): void {
    this._mainService.news$.subscribe((res) => {
      if (res.length) {
        this.news = res;
        this.totalPages = Math.ceil(res.length / 3);
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
    const startIndex = (page - 1) * 3;
    const endIndex = startIndex + 3;
    return this.news.slice(startIndex, endIndex);
  }
}
