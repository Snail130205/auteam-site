import {Component, Input} from '@angular/core';
import {IPreviewNews} from "../../interfaces/preview-news.interface";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  @Input()
  public page: string = '';
  public newsPreview: IPreviewNews[] = [
    {
      id: 1,
      title: 'Регистрация',
      description: 'Это замечательная возможность проверить ' +
        'свои навыки и знания в области сетевых технологий, а также ' +
        'продемонстрировать...',
      image: './assets/icons/b4ee94aa20bd9af0dafd3b4d62332c08.jpeg'
    },
    {
      id: 2,
      title: 'Регистрация',
      description: 'Это замечательная возможность проверить ' +
        'свои навыки и знания в области сетевых технологий, а также ' +
        'продемонстрировать...',
      image: './assets/icons/b4ee94aa20bd9af0dafd3b4d62332c08.jpeg'
    },
    {
      id: 3,
      title: 'Регистрация',
      description: 'Это замечательная возможность проверить ' +
        'свои навыки и знания в области сетевых технологий, а также ' +
        'продемонстрировать...',
      image: './assets/icons/b4ee94aa20bd9af0dafd3b4d62332c08.jpeg'
    },
  ];
}
