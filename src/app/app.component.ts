import {Component, importProvidersFrom, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./entities/components/header/header.component";
import {FooterComponent} from "./entities/components/footer/footer.component";
import {LoaderComponent} from "./core/loader/loader.component";
import {MainService} from "./entities/services/main.service";
import {DxToastModule} from "devextreme-angular";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {bootstrapApplication} from "@angular/platform-browser";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent, DxToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly _mainService: MainService = inject(MainService);

  public isLoading: boolean = false;
  public message: string = '';
  public isVisible: boolean = false;
  type: string = '';

  constructor(public translate: TranslateService) {
    translate.addLangs(['EN', 'RU']);
    translate.setDefaultLang('RU');
  }

  public ngOnInit(): void {
    this._mainService.getNews().then();

    this._mainService.loader$
      .subscribe((loader: boolean) => this.isLoading = loader);

    this._mainService.message$
      .subscribe((message: string) => {
      if (message) {
        this.message = message;
        this.type = message === 'Регистрация успешно пройдена!' ? 'success' : 'error';
        this.isVisible = true;
      }
      });
  }
}
