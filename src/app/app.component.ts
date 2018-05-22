import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <ul>
        <li><a routerLink="posts">Posts</a></li>
        <li><a routerLink="sign-in">Login</a></li>
      </ul>
    </nav>

    <section id="logo">
      <h2>Blog</h2>
      <h3>MeetJS Bialystok</h3>
    </section>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
