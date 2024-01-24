import {IMenuButton} from "../interfaces/menu-button.interface";
import {IInformationTab} from "../interfaces/information-tab.interface";
import {TranslateService} from "@ngx-translate/core";
import {IEducation} from "../interfaces/education.interface";

export abstract class MainLib {
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
      name: 'Среднее',
      en: 'Secondary education'
    },
    {
      id: 2,
      name: 'Среднее специальное',
      en: 'Specialized secondary'
    },
    {
      id: 3,
      name: 'Высшее',
      en: 'Higher education'
    },
  ];

  public static readonly partners: any[] = [
    {
      img: './assets/logos/alt.jpg',
      link: 'https://basealt.ru'
    },
    // {
    //   img: './assets/logos/astra.jpg',
    //   link: 'https://astralinux.ru'
    // },
    // {
    //   img: './assets/logos/avrora.jpg',
    //   link: 'https://auroraos.ru/'
    // },
    // {
    //   img: './assets/logos/eltex.jpg',
    //   link: 'https://eltex-co.ru'
    // },
    // {
    //   img: './assets/logos/neytrino.jpg',
    //   link: 'https://kpda.ru/products/kpda10964/'
    // },
    // {
    //   img: './assets/logos/postgres.jpg',
    //   link: 'https://postgrespro.ru'
    // },
    // {
    //   img: './assets/logos/pt.jpg',
    //   link: 'https://ptsecurity.com'
    // },
    // {
    //   img: './assets/logos/red.jpg',
    //   link: 'https://redos.red-soft.ru'
    // },
    // {
    //   img: './assets/logos/rosa.jpg',
    //   link: 'https://rosalinux.ru'
    // },
    {
      img: './assets/logos/secopin.jpg',
      link: 'https://secopin.com'
    },
    {
      img: './assets/logos/Academy-rosatom.jpg',
      link: 'https://rosatom-academy.ru/'
    },
    {
      img: './assets/logos/rosatom.png',
      link: 'https://www.rosatom.ru/index.html'
    },
    {
      img: './assets/logos/dialog.png',
      link: 'https://dialog-digital.ru/'
    },

    // {
    //   img: './assets/logos/tayle.jpg',
    //   link: 'https://www.tayle.ru/'
    // }
  ];
}
