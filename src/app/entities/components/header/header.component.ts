import {Component, inject} from '@angular/core';
import {DevExtremeModule} from "devextreme-angular";
import {IMenuButton} from "../../interfaces/menu-button.interface";
import {MainLib} from "../../libs/main.lib";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainService} from "../../services/main.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DevExtremeModule, RouterLinkActive, RouterLink, NgForOf, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _mainService: MainService = inject(MainService);
  public buttons: IMenuButton[] = MainLib.menuButtons;
  public selectedLanguage: string = 'RU';
  public supportedLanguages: string[] = ['RU', 'EN'];

  public changeLanguage(): void {
    this._mainService.selectedLanguage(this.selectedLanguage);
  }
}
