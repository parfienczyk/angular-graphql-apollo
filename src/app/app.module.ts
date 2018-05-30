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

// common
import { AuthService } from '@app/feature/auth/services/auth.service';

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
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
