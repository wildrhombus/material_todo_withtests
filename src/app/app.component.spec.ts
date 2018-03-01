import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DialogComponent
      ],
      imports: [ FormsModule, BrowserAnimationsModule, MaterialModule ]
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app',() => {
    expect(app).toBeTruthy();
  });

  it(`should have an empty todoList`, () => {
    expect(app.todoList).toEqual([]);
  });

  it('should have initial values', () => {
    expect(app.showDialog).toBeFalsy;
    expect(app.editingTodo).toBeNull;
    expect(app.fieldValue).toEqual('');
    expect(app.okButtonText).toEqual('Create');
  });

  describe('Open Create Dialog', () => {
    let de_add:      DebugElement;
    let el_add:      HTMLElement;

    beforeEach( () => {
      de_add = fixture.debugElement.query(By.css('.tst__add'));
      el_add = de_add.nativeElement;

    });

    it('should call todoDialog when add clicked', fakeAsync(() => {
      spyOn(app, 'todoDialog');

      de_add.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();

      expect(app.todoDialog).toHaveBeenCalledWith();
    }));

    it('should show the dialog component initialized as a Create input', fakeAsync(() => {
      de_add.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();

      expect(app.showDialog).toBeTruthy;
      expect(app.editingTodo).toBeNull;
      expect(app.fieldValue).toEqual('');
      expect(app.okButtonText).toEqual('Create');
    }));
  });

  describe('Add a todo', () => {
    let de_todo_rows:      DebugElement[];

    beforeEach( fakeAsync(() => {
      app.editingTodo = null;
      app.showDialog = true;

      app.updateTodo('new todo title');
      fixture.detectChanges();

      de_todo_rows = fixture.debugElement.queryAll(By.css('.mat-list-item')).map(de => de.nativeElement);
    }));

    it('should have a todo list', () => {
      expect(de_todo_rows.length).toBe(1);
    });

    it('should close the dialog', () => {
      expect(app.showDialog).toEqual(false);
    });
  });

  describe('With todos', () => {
    let de_todo_rows:      DebugElement[];
    let el_edit:      HTMLElement;

    beforeEach( fakeAsync(() => {
      app.todoList = [{title: 'first todo', completed: false}, {title: 'second todo', completed: false}];
      fixture.detectChanges();

      de_todo_rows = fixture.debugElement.queryAll(By.css('.mat-list-item')).map(de => de.nativeElement);
    }));

    it('should a todo list', () => {
      expect(de_todo_rows.length).toBe(2);
    });

    it('should have a completed todo row', () => {
      let first_row: DebugElement = fixture.debugElement.queryAll(By.css('.mat-list-item'))[0];
      let checkbox: DebugElement = first_row.query(By.css('.mat-checkbox'));
      let buttons: DebugElement[] = first_row.queryAll(By.css('.mat-list-item .mat-icon'));

      expect( checkbox.nativeElement.textContent).toContain('first todo');
      expect( buttons.length ).toEqual(2);
      expect( buttons[0].nativeElement.textContent).toContain('delete_forever');
      expect( buttons[1].nativeElement.textContent).toContain('mode_edit');
    });

    describe('Open Edit Dialog', () => {
      let first_row: DebugElement;
      let button_edit: DebugElement;

      beforeEach( () => {
        first_row = fixture.debugElement.queryAll(By.css('.mat-list-item'))[0];
        button_edit = first_row.queryAll(By.css('.mat-list-item button'))[1];
      });

      it('should open edit dialog', fakeAsync(() => {
        spyOn(app, 'todoDialog');

        button_edit.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();

        expect(app.todoDialog).toHaveBeenCalledWith(app.todoList[0]);
      }));

      it('should show the dialog component initialized as a Edit input', fakeAsync( () => {
        button_edit.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();

        expect(app.showDialog).toBeTruthy;
        expect(app.editingTodo).toEqual(app.todoList[0]);
        expect(app.fieldValue).toEqual(app.todoList[0].title);
        expect(app.okButtonText).toEqual('Edit');
      }));
    });

    describe('Edit a todo', () => {
      let origTitle: string;

      beforeEach( fakeAsync(() => {
        origTitle = app.todoList[1].title;
        app.editingTodo = app.todoList[1];
        app.fieldValue = app.todoList[1].title;
        app.showDialog = true;

        app.updateTodo('a different todo title');
        fixture.detectChanges();

        de_todo_rows = fixture.debugElement.queryAll(By.css('.mat-list-item')).map(de => de.nativeElement);
      }));

      it('should have a todo list', () => {
        expect(de_todo_rows.length).toBe(2);
      });

      it('should close the dialog', () => {
        expect(app.showDialog).toEqual(false);
        expect(app.editingTodo).toBeNull;
        expect(app.fieldValue).toBeNull;
      });

      it('should have changed the title', () => {
        expect(app.todoList[1].title).not.toEqual(origTitle);
      });
    });

    describe('Delete a todo', () => {
     beforeEach( fakeAsync(() => {
        app.editingTodo = app.todoList[1];
        app.fieldValue = app.todoList[1].title;

        app.remove(0);
        fixture.detectChanges();

        de_todo_rows = fixture.debugElement.queryAll(By.css('.mat-list-item')).map(de => de.nativeElement);
      }));

      it('should have one less todo row', () => {
        expect(de_todo_rows.length).toBe(1);
      });
    });
  });
});
