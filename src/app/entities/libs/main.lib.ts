import {IMenuButton} from "../interfaces/menu-button.interface";
import {IInformationTab} from "../interfaces/information-tab.interface";

export abstract class MainLib {
  public static readonly menuButtons: IMenuButton[] = [
    {
      name: 'Главная',
      route: ''
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
  ];

  public static readonly informationTab: IInformationTab[] = [
    {
      iconPatch: './assets/icons/linux.svg',
      title: 'Linux System',
      text: 'Операционная система с открытам исходным кодом'
    },
    {
      iconPatch: './assets/icons/network.svg',
      title: 'Networking',
      text: 'Построение сетей и соединение устройств'
    },
    {
      iconPatch: './assets/icons/services.svg',
      title: 'Services',
      text: 'Работа с функциональными сервисами и ресурсами'
    },
    {
      iconPatch: './assets/icons/design.svg',
      title: 'Infrastructure Design',
      text: 'Проектирование инфраструктуры IT-систем'
    },
    {
      iconPatch: './assets/icons/education.svg',
      title: 'Education',
      text: 'Обучение и развитие профессиональных навыков'
    },
    {
      iconPatch: './assets/icons/integration.svg',
      title: 'Integration',
      text: 'Интеграция различных систем и платформ'
    }
  ]
}
