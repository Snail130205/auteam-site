import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./entities/components/header/header.component";
import {FooterComponent} from "./entities/components/footer/footer.component";
import {LoaderComponent} from "./core/loader/loader.component";
import {MainService} from "./entities/services/main.service";
import {DxToastModule} from "devextreme-angular";

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

  public ngOnInit(): void {
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
