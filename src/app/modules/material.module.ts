import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule
  ]
})
export class MaterialModule {}