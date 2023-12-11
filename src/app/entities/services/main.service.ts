import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MainService {
  public url: string = 'http://192.168.3.2:8000/api/';

  private _loader$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loader$: Observable<boolean> = this._loader$$.asObservable();

  private _message$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public message$: Observable<string> = this._message$$.asObservable();

  constructor(private _httpClient: HttpClient) { }

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
}
