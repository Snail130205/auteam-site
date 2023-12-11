import {Component, inject, OnInit} from '@angular/core';
import {DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from "devextreme-angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MainLib} from "../../libs/main.lib";
import {HttpClient} from "@angular/common/http";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-olympiad',
  standalone: true,
  imports: [
    DxTextBoxModule,
    DxSelectBoxModule,
    ReactiveFormsModule,
    DxButtonModule,
    DxValidatorModule
  ],
  templateUrl: './olympiad.component.html',
  styleUrl: './olympiad.component.scss'
})
export class OlympiadComponent implements OnInit {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _mainService: MainService = inject(MainService);

  public rules: any = { X: /[02-9]/ };
  public educationTypes: any[] = MainLib.educationTypes;
  public form: FormGroup = this._fb.group({
    teamLeadName: [null, [Validators.required, Validators.pattern('^[А-Яа-яЁё]+\s[А-Яа-яЁё]+(\s[А-Яа-яЁё]+)?$')]],
    teamLeadPhone: null,
    teamLeadEmail: [null, [Validators.required, Validators.email]],
    educationalFullName: [null,  [Validators.required, Validators.pattern('^[А-Яа-яЁё]+\s[А-Яа-яЁё]+(\s[А-Яа-яЁё]+)?$')]],
    educationalPosition:  [null, [Validators.required, Validators.pattern('\w+')]],
    education: [null, [Validators.required, Validators.min(5)]],
    educationalType: [null, [Validators.required]],
    teamName: [null, [Validators.required, Validators.min(5), Validators.max(20)]],
    participantFullName1: [null, [Validators.required, Validators.pattern('^[А-Яа-яЁё]+\s[А-Яа-яЁё]+(\s[А-Яа-яЁё]+)?$')]],
    participantFullName2: [null, [Validators.required, Validators.pattern('^[А-Яа-яЁё]+\s[А-Яа-яЁё]+(\s[А-Яа-яЁё]+)?$')]],
    participantEmail1: [null, [Validators.required, Validators.email]],
    participantEmail2: [null, [Validators.required, Validators.email]],
    participantPhone1: [null, [Validators.required]],
    participantPhone2: [null, [Validators.required]],
  });

  public ngOnInit(): void {
  }

  public registration(): void {
    const teamLeadPhone: string = '+7' + this.form.get('teamLeadPhone');
    const participantPhone1: string = '+7' + this.form.get('participantPhone1');
    const participantPhone2: string = '+7' + this.form.get('participantPhone1');
    this.form.get('participantPhone1')?.patchValue(participantPhone1);
    this.form.get('participantPhone2')?.patchValue(participantPhone2);
    this.form.get('teamLeadPhone')?.patchValue(teamLeadPhone);
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
}
