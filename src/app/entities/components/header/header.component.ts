import { Component } from '@angular/core';
import {DevExtremeModule} from "devextreme-angular";
import {IMenuButton} from "../../interfaces/menu-button.interface";
import {MainLib} from "../../libs/main.lib";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DevExtremeModule, RouterLinkActive, RouterLink, NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public buttons: IMenuButton[] = MainLib.menuButtons;
}
