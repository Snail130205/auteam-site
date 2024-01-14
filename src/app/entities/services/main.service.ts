import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";


@Injectable({
  providedIn: 'root'
})
export class MainService {
  public url: string = 'https://au-team.ru/api/';

  private _loader$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loader$: Observable<boolean> = this._loader$$.asObservable();

  private _message$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public message$: Observable<string> = this._message$$.asObservable();

  private _news$$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public news$: Observable<any[]> = this._news$$.asObservable();

  private _newsDetail$$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public newsDetail$: Observable<any> = this._newsDetail$$.asObservable();

  private _olympiadInfo$$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public olympiadInfo$: Observable<any> = this._olympiadInfo$$.asObservable();

  private _selectedLanguage$$: BehaviorSubject<string> = new BehaviorSubject<string>('RU');
  public selectedLanguage$: Observable<string> = this._selectedLanguage$$.asObservable();


  constructor(private _httpClient: HttpClient,
              private _translate: TranslateService
  ) { }

  public set loader(loader: boolean) {
    this._loader$$.next(loader);
  }

  public get loader(): boolean {
    return this._loader$$.getValue();
  }

  public set message(message: string) {
    this._message$$.next(message);
  }

  public get message(): string {
    return this._message$$.getValue();
  }

  public set newsDetail(newsDetail: any) {
    this._newsDetail$$.next(newsDetail);
  }

  public get newsDetail(): any {
    return this._newsDetail$$.getValue();
  }

public selectedLanguage(selectedLanguage: string): void {
    this._translate.use(selectedLanguage);
}

  public async sendForm(body: any): Promise<any> {
    this.loader = true;
    try {
      const data = await this._httpClient.post(this.url + 'register/registerTeam', body).toPromise();
      this.loader = false;
      this.message = 'Регистрация успешно пройдена!'
      return data;
    } catch (error: any ) {
      this.message = error.error.message;
      this.loader = false;
      throw error;
    }
  }

  public async getNews(): Promise<any> {
    this.loader = true;
    try {
      const data: any = await this._httpClient.get(this.url + 'news/getNews').toPromise();
      this.loader = false;
      return this._news$$.next(data);
    } catch (error: any ) {
      this.message = 'Не удалось загрузить новости!';
      this.loader = false;
      throw error;
    }
  }

  public async getOlympiadInfo(): Promise<any> {
    this.loader = true;
    try {
      const data: any = await this._httpClient.get(this.url + 'olympiad/1').toPromise();
      this.loader = false;
      return this._olympiadInfo$$.next(data);
    } catch (error: any ) {
      this.message = 'Не удалось получить информацию о преведении олимпиады!';
      this.loader = false;
      throw error;
    }
  }

  public async registration(token: string): Promise<any> {
    const secretKey: string = 'ysc2_PaSw5WvSh4SU1AaM5CcHw5hYs7yHBryckhmohgxL3515b98b';
    const apiUrl: string = `https://smartcaptcha.yandexcloud.net/validate?secret=${secretKey}&token=${token}`;

    this.loader = true;
    try {
      const data: any = await this._httpClient.get(apiUrl).toPromise();
      this.loader = false;
      return data;
    } catch (error: any ) {
      this.message = 'Не удалось пройти проверку! Попробуйте еще раз';
      this.loader = false;
      throw error;
    }
  }
}
