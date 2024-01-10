import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from "devextreme-angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MainLib} from "../../libs/main.lib";
import {HttpClient} from "@angular/common/http";
import {MainService} from "../../services/main.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IEducation} from "../../interfaces/education.interface";
import moment from "moment";
import {interval, Subscription} from "rxjs";
import {NgForOf} from "@angular/common";

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
    NgForOf
  ],
  templateUrl: './olympiad.component.html',
  styleUrl: './olympiad.component.scss'
})
export class OlympiadComponent implements OnInit, OnDestroy{
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _mainService: MainService = inject(MainService);

  public selectedLang: string = 'RU';
  public rules: any = { X: /[02-9]/ };
  public educationTypes: IEducation[] = MainLib.educationTypes;
  public date: moment.Moment = moment(new Date());
  public timerText: string = '';
  public teamCount: number = 0;
  public partners: any[] = MainLib.partners;
  // @ts-ignore
  private timerSubscription: Subscription;

  public form: FormGroup = this._fb.group({
    teamLeadName: [null, [Validators.required]],
    teamLeadPhone: ['+', [
      Validators.required,
      Validators.pattern('^\\+\\d{1,4}[-.\\s]?\\d{1,14}$')]],
    teamLeadEmail: [null, [Validators.required, Validators.email]],
    educationalFullName: [null,  [Validators.required]],
    educationalPosition:  [null, [Validators.required]],
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
    this._mainService.olympiadInfo$.subscribe((olympiadInfo) => {
      if (olympiadInfo) {
        this.date = moment(olympiadInfo.olympiadStartDate.date);
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

  public registration(): void {
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

  getTimeRemaining(): string {
    const now = moment();
    const duration = moment.duration(this.date.diff(now));

    const days = duration.days();
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
    this.timerText = this.getTimeRemaining();
  }
}
