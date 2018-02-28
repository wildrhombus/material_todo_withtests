import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class MaterialModule {}