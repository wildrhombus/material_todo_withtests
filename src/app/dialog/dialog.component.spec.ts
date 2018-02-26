import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material.module';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let de_cancel:      DebugElement;
  let el_cancel:      HTMLElement;
  let de_ok:      DebugElement;
  let el_ok:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;

    de_cancel = fixture.debugElement.query(By.css('.tst__cancel_button'));
    el_cancel = de_cancel.nativeElement;

    de_ok = fixture.debugElement.query(By.css('.tst__ok_button'));
    el_ok = de_ok.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original cancel button label', () => {
    fixture.detectChanges();
    expect(el_cancel.textContent).toContain(component.cancelText);
  });

  it('should display a different cancel button label', () => {
    component.cancelText = 'Reset';
    fixture.detectChanges();
    expect(el_cancel.textContent).toContain('Reset');
  });
});
