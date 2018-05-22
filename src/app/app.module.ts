import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// graphQL
import { GraphQLModule } from '@app/apollo.config';

// modules
import { PostsModule } from './feature/blog/posts/posts.module';
import { AuthModule } from './feature/auth/auth.module';
import { CommentsModule } from './feature/blog/comments/comments.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // routing
    AppRoutingModule,

    // graphQL
    GraphQLModule,

    // custom
    PostsModule,
    AuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
