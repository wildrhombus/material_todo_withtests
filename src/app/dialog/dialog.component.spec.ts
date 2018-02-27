import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
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
  let de_value:   DebugElement;
  let el_value:   HTMLInputElement;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially be empty', () => {
    expect(fixture.debugElement.children.length).toBe(0);
  });

  describe('Visible Dialog', () => {
    beforeEach(() => {
      component.showPrompt = true;
      fixture.detectChanges();

      de_value = fixture.debugElement.query(By.css('.tst__value'));
      el_value = de_value.nativeElement;

      de_cancel = fixture.debugElement.query(By.css('.tst__cancel_button'));
      el_cancel = de_cancel.nativeElement;

      de_ok = fixture.debugElement.query(By.css('.tst__ok_button'));
      el_ok = de_ok.nativeElement;

      spyOn(component, 'emitValue');

      el_value.value = 'something';
      el_value.dispatchEvent(new Event('input'));
    });

    it('should call emitValue with null when cancel clicked', fakeAsync( () => {
      de_cancel.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();

      expect(component.emitValue).toHaveBeenCalledWith(null);
    }));

    it('should call emitValue with value when okay clicked', fakeAsync( () => {
      de_ok.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();

      expect(component.emitValue).toHaveBeenCalledWith('something');
    }));

    it('should call emitValue with value on keyup enter', fakeAsync( () => {
      de_value.triggerEventHandler('keyup.enter', null);
      tick();
      fixture.detectChanges();

      expect(component.emitValue).toHaveBeenCalledWith('something');
    }));

    it('should call emitValue with value on keyup exit', fakeAsync( () => {
      de_value.triggerEventHandler('keyup.enter', null);
      tick();
      fixture.detectChanges();

      expect(component.emitValue).toHaveBeenCalledWith('something');
    }));
  });
});
