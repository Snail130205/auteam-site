import {IMenuButton} from "../interfaces/menu-button.interface";

export abstract class MainLib {
  public static readonly menuButtons: IMenuButton[] = [
    {
      name: 'Главная',
      route: 'main'
    },
    {
      name: 'Новости',
      route: 'news'
    },
    {
      name: 'Олимпиада FoNT',
      route: 'olympiad'
    },
    {
      name: 'О нас',
      route: 'information'
    },
  ]
}
