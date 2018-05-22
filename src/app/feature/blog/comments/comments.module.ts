import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import * as fromComponents from './components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  declarations: [
    ...fromComponents.components,
  ],
  exports: [
    ...fromComponents.components,
  ]
})
export class CommentsModule { }
