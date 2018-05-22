import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// routing
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // routing
    AuthRoutingModule,
  ],
  declarations: [
    // containers
    ...fromContainers.containers,
    // components
    ...fromComponents.components,
  ]
})
export class AuthModule { }
