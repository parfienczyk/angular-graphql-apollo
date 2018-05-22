import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    // components
    ...fromComponents.components,
  ],
  exports: [
    // components
    ...fromComponents.components,
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        // SomeService
      ]
    };
  }
}
