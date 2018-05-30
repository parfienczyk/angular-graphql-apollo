import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav>
        <h2>Blog</h2>
        <ul>
          <li><a routerLink="posts" routerLinkActive="active">Posts</a></li>
          <li><a routerLink="sign-in" routerLinkActive="active">Login</a></li>
        </ul>
      </nav>
    </header>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
