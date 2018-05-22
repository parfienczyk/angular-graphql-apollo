import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// apollo
import { Apollo } from 'apollo-angular';
import * as Query from './../../graphql';  // GraphQL queries

// model
import { Post } from '../../models/Post';


@Component({
  selector: 'post-show',
  template: `

    <a [routerLink]="['/posts']">
      <img src="./assets/images/Arrows-Left-icon.png" alt="Back to Posts" width="40">
    </a>

    <h4 *ngIf="loading">Loading...</h4>

    <article class="post" *ngIf="post">
      <div class="info">{{ post.createdAt | date }}</div>
      <h1 class="title">{{ post.title }}</h1>

      <div class="stats">
        <div>
          VOTES: {{ post.votes.length }}
          <post-vote [postId]="post.id"></post-vote>
        </div>
        <div>
          LIKES: {{ post.likes }}
          <post-like [post]="post"></post-like>
        </div>
      </div>
      <div class="content">{{ post.description }}</div>
    </article>

    <section id="comments" *ngIf="post">
      <comment-create></comment-create>
      <comments [post]="post.id"></comments>
    </section>
  `,
  styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {

  id: string;
  post: Post;
  loading = true;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    // get ID
    this.route.params.subscribe(({ id }) => this.id = id);

    // get One Post
    this.apollo
      .watchQuery<any>({
        query: Query.ONE_POSTS_QUERY,
        variables: {
          id: this.id,
        }
      })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.post = data.Post;
        this.loading = loading;
      });
  }

  onLike() {

  }
}
