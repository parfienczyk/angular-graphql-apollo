import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// routing
import { PostsRoutingModule } from './posts.routing';
import { CommentsModule } from '../comments/comments.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommentsModule,

    // common
    SharedModule,
    // routing
    PostsRoutingModule,
  ],
  declarations: [
    // containers
    ...fromContainers.containers,
    // components
    ...fromComponents.components,
  ]
})
export class PostsModule { }
