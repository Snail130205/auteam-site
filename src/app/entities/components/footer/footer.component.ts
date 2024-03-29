import { Component } from '@angular/core';
import {IMenuButton} from "../../interfaces/menu-button.interface";
import {MainLib} from "../../libs/main.lib";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgForOf,
    RouterLinkActive,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public buttons: IMenuButton[] = MainLib.menuButtons;
  public date: number = new Date().getFullYear();
}
