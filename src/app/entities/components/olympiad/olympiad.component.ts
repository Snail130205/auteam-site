import {AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from "devextreme-angular";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MainLib} from "../../libs/main.lib";
import {HttpClient} from "@angular/common/http";
import {MainService} from "../../services/main.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IEducation} from "../../interfaces/education.interface";
import moment, {duration, now} from "moment";
import {interval, Subscription} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";

declare global {
  interface Window {
    yandex_captcha: () => void;
  }
}


@Component({
    selector: 'app-olympiad',
    standalone: true,
    imports: [
        DxTextBoxModule,
        DxSelectBoxModule,
        ReactiveFormsModule,
        DxButtonModule,
        DxValidatorModule,
        TranslateModule,
        NgForOf,
        NgIf,
        FormsModule
    ],
    templateUrl: './olympiad.component.html',
    styleUrl: './olympiad.component.scss'
})
export class OlympiadComponent implements OnInit, OnDestroy {
    private readonly _fb: FormBuilder = inject(FormBuilder);
    private readonly _mainService: MainService = inject(MainService);
    private readonly _renderer: Renderer2 = inject(Renderer2);
    private readonly _http: HttpClient = inject(HttpClient);

    public selectedLang: string = 'RU';
    public rules: any = {X: /[02-9]/};
    public educationTypes: IEducation[] = MainLib.educationTypes;
    public date: moment.Moment = moment(new Date());
    public dateOlympiad: Date = new Date();
    public NowDate: Date = new Date();
    public timerText: string = '';
    public teamCount: number = 0;
    public disabledForm: boolean = true;
    public partners: any[] = MainLib.partners;
    public token: string = '';
    // @ts-ignore
    private timerSubscription: Subscription;

    public form: FormGroup = this._fb.group({
        teamLeadName: [null, [Validators.required]],
        teamLeadPhone: ['+', [
            Validators.required,
            Validators.pattern('^\\+\\d{1,4}[-.\\s]?\\d{1,14}$')]],
        teamLeadEmail: [null, [Validators.required, Validators.email]],
        educationalFullName: [null, [Validators.required]],
        educationalPosition: [null, [Validators.required]],
        education: [null, [Validators.required]],
        educationalType: [null, [Validators.required]],
        teamName: [null, [Validators.required, Validators.max(20)]],
        participantFullName1: [null, [Validators.required]],
        participantFullName2: [null, [Validators.required]],
        participantEmail1: [null, [Validators.required, Validators.email]],
        participantEmail2: [null, [Validators.required, Validators.email]],
        participantPhone1: ['+', [
            Validators.required,
            Validators.pattern('^\\+\\d{1,4}[-.\\s]?\\d{1,14}$')]],
        participantPhone2: ['+', [
            Validators.required,
            Validators.pattern('^\\+\\d{1,4}[-.\\s]?\\d{1,14}$')]],
    });

    constructor(private translateService: TranslateService) {
    }

    public ngOnInit(): void {
      window.yandex_captcha = this.yandexCaptcha.bind(this);
      this.initYandexCaptcha();
        this._loadCaptchaScript();
        this._changedForm();
        this._mainService.olympiadInfo$.subscribe((olympiadInfo) => {
            if (olympiadInfo) {
                this.date = moment(olympiadInfo.olympiadStartDate);
                this.dateOlympiad = new Date(olympiadInfo.olympiadStartDate);
                this.teamCount = olympiadInfo.teamCount;
            }
        });
        this.translateService.onLangChange.subscribe((res) => {
            this.selectedLang = res.lang;
        });

        this.timerSubscription = interval(1000).subscribe(() => {
            this.updateTimer();
        });
    }

    public openFile(fileName: string): void {
        const fileUrl: string = './assets/files/' + fileName;
        window.open(fileUrl, '_blank');
    }

  public initYandexCaptcha(): void {
    const script = document.createElement('script');
    script.innerHTML = `
      document.addEventListener('DOMContentLoaded', function() {
        new window.Ya.Captcha({
          element: document.querySelector('.smart-captcha'),
          callbacks: {
            load: function() {},
            render: function() {},
            submit: function() {},
            abort: function() {}
          }
        });
      });
    `;
    document.body.appendChild(script);
  }

  public yandexCaptcha(): void {
    // @ts-ignore
    const smartToken: string = document.querySelector('input[name="smart-token"]').value;
    this.token = smartToken;
  }

    public registration(): void {
        this._mainService.registration(this.token)
            .then((data) => {
                if (data.success) {
                    const body: Record<string, any> = {
                        olympiadId: 1,
                        registrationForm: this.form.value
                    };
                    this._mainService.sendForm(body)
                        .then((data) => {
                            if (data) {
                                this.form.reset();
                            }
                        });
                }
            })
    }

    public getTimeRemaining(): string {
        const now = moment();
        const duration = moment.duration(this.date.diff(now));

        const days = Math.floor(duration.asDays()); // Получение полных дней
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return this.translateService.instant('TIMER.REMAINING', {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        });
    }

    ngOnDestroy(): void {
        // Отписываемся от таймера при уничтожении компонента
        this.timerSubscription.unsubscribe();
    }

    private updateTimer(): void {
        if (new Date() < this.dateOlympiad) {
            this.timerText = this.getTimeRemaining();
        } else {
            this.timerText = this.translateService.instant('TIMER.REMAINING', {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
        }
    }

    private _changedForm(): void {
        this.form.valueChanges
            .subscribe(() => {
                this.disabledForm = this.form.invalid;
            });
    }

    private _loadCaptchaScript(): void {
        const script = this._renderer.createElement('script');
        script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
        script.defer = true;
        this._renderer.appendChild(document.head, script);
    }

  public yandex_captcha(): void {
    // @ts-ignore
    let smart_token: string = document.querySelector("input[name='smart-token']").value as string;
    console.log(smart_token);
  }
}
