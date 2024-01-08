import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit{
  public opportunitiesList: string[] = [];
  public teach: string[] = [];

  constructor(private translateService: TranslateService) {

  }

  public ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.loadOpportunitiesList();
      this.loadTeach();
    });
    this.loadOpportunitiesList();
    this.loadTeach();
  }

  private loadOpportunitiesList(): void {
    this.translateService.get('OPPORTUNITIES_LIST').subscribe((translations: string[]) => {
      this.opportunitiesList = translations;
    });
  }

  private loadTeach(): void {
    this.translateService.get('UYMIN_TEACH_LIST').subscribe((translations: string[]) => {
      this.teach = translations;
    });
  }
}
