import {IMenuButton} from "../interfaces/menu-button.interface";
import {IInformationTab} from "../interfaces/information-tab.interface";
import {TranslateService} from "@ngx-translate/core";
import {IEducation} from "../interfaces/education.interface";

export abstract class MainLib {
  constructor(private translate: TranslateService) { }

  public static readonly menuButtons: IMenuButton[] = [
    {
      name: 'HOME',
      route: 'main'
    },
    {
      name: 'NEWS',
      route: 'news'
    },
    {
      name: 'OLYMPIAD',
      route: 'olympiad'
    },
    {
      name: 'ABOUT_US',
      route: 'information'
    },
  ];

  public static readonly informationTab: IInformationTab[] = [
    {
      iconPatch: './assets/icons/linux.svg',
      title: 'LINUX_SYSTEM',
      text: 'Операционная система с открытым исходным кодом'
    },
    {
      iconPatch: './assets/icons/network.svg',
      title: 'NETWORKING',
      text: 'Построение сетей и соединение устройств'
    },
    {
      iconPatch: './assets/icons/services.svg',
      title: 'SERVICES',
      text: 'Работа с функциональными сервисами и ресурсами'
    },
    {
      iconPatch: './assets/icons/design.svg',
      title: 'INFRASTRUCTURE_DESIGN',
      text: 'Проектирование инфраструктуры IT-систем'
    },
    {
      iconPatch: './assets/icons/education.svg',
      title: 'EDUCATION',
      text: 'Обучение и развитие профессиональных навыков'
    },
    {
      iconPatch: './assets/icons/integration.svg',
      title: 'INTEGRATION',
      text: 'Интеграция различных систем и платформ'
    }
  ];

  public static readonly educationTypes: IEducation[] = [
    {
      id: 1,
      name: 'Школа',
      en: 'School'
    },
    {
      id: 3,
      name: 'Университет',
      en: 'University'
    },
    {
      id: 2,
      name: 'Колледж',
      en: 'Collage'
    },
  ];

  getMenuButtonText(key: string): string {
    return this.translate.instant(key);
  }
}
