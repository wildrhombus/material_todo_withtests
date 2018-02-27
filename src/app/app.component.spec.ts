import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DialogComponent
      ],
      imports: [ FormsModule, MaterialModule ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
