import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympiadComponent } from './olympiad.component';

describe('OlympiadComponent', () => {
  let component: OlympiadComponent;
  let fixture: ComponentFixture<OlympiadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympiadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OlympiadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
