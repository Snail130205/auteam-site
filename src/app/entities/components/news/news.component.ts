import {Component, inject, Input, OnInit} from '@angular/core';
import {IPreviewNews} from "../../interfaces/preview-news.interface";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MainService} from "../../services/main.service";
import {routes} from "../../../app.routes";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    TranslateModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  @Input()
  public page: string = '';

  @Input()
  public newsPreview: any[] = [];

  private readonly _mainService: MainService = inject(MainService);

  ngOnInit(): void {
  }

  public routesPage(news: any): void {
    this._mainService.newsDetail = news;
  }
}
