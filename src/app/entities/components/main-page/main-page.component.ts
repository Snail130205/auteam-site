import { Component } from '@angular/core';
import {IInformationTab} from "../../interfaces/information-tab.interface";
import {MainLib} from "../../libs/main.lib";
import {NgForOf} from "@angular/common";
import {NewsComponent} from "../news/news.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgForOf,
    NewsComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  public tabs: IInformationTab[] = MainLib.informationTab;
}
