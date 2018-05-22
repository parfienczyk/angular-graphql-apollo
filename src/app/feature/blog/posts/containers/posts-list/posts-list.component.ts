import { Component, OnInit, OnDestroy } from '@angular/core';
// animation
import { trigger, state, style, animate, transition } from '@angular/animations';

// apollo
import { Apollo, QueryRef } from 'apollo-angular';
import * as Query from './../../graphql';  // GraphQL queries

// model
import { Post } from './../../models/Post';

// rxjs
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'posts-list',
  template: `
    <section>
      <div id="posts">
        <h4 *ngIf="loading">Loading...</h4>
        <post-item *ngFor="let post of posts" [post]="post" [@flyInOut2]></post-item>
      </div>
    </section>

    <post-create></post-create>
  `,
  styleUrls: ['./posts-list.component.scss'],
  animations: [
    trigger('flyInOut2', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-60%)' }),
        animate(300)
      ]),
      // transition('* => void', [
      //   animate(200, style({ transform: 'translateX(100%)' }))
      // ]),
      transition(':leave', [
        style({ transform: 'translateY(50%)' }),
        animate(300)
      ]),
    ])
  ]
})
export class PostsListComponent implements OnInit, OnDestroy {

  loading = true;
  posts: Post[] = [];
  postSubscription: Subscription;
  postQuery: QueryRef<any>;

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    this.postQuery = this.apollo
      .watchQuery<Query.AllPostQueryResponse>({
        query: Query.ALL_POSTS_QUERY
      });

    this.postSubscription = this.postQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.posts = [...data.allPosts];
        this.loading = loading;
      }
    );

    this.setupSubscription();
  }

  setupSubscription() {
    this.postQuery.subscribeToMore({
      document: Query.CREATE_POST_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newPost = subscriptionData.data.Post.node;

        return Object.assign({}, prev, {
          allPosts: [newPost, ...prev['allPosts']]
        });
      }
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
