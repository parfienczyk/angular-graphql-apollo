import { Post } from './../../../posts/models/Post';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

// animation
import * as Animations from '@app/shared/animations';

// model
import { Comment } from './../../models/comment';

// apollo
import { Apollo, QueryRef } from 'apollo-angular';
import * as Query from './../../graphql';  // GraphQL queries

// rxJS
import { Subscription } from 'rxjs/Subscription';

export const COMMENTS_PER_QUERY = 5;

@Component({
  selector: 'comments',
  template: `
    <section *ngIf="comments.length" class="comments">
      <h4>Comments [ {{ counter }} ]</h4>

      <!-- <article *ngFor="let comment of comments" [@flyInOut]>-->
      <article *ngFor="let comment of comments">
        <div><img [src]="comment.author.avatarUrl" alt=""></div>
        <div>
          <p>{{ comment.content }}</p>
          <div class="info">
            <strong>{{ comment.author.firstName }} {{ comment.author.lastName }}</strong>,
            {{ comment.createdAt|date:'short' }}
          </div>
        </div>
      </article>

      <kp-button
        *ngIf="comments.length < counter"
        [label]="'Load more'"
        [isLoading]="loading"
        (clicked)="loadMore()">
      </kp-button>
    </section>
  `,
  styleUrls: ['./comments.component.scss'],
  // animations: [Animations.flyInOut]
})
export class CommentsComponent implements OnInit, AfterViewInit {

  // post ID
  @Input() post: string;

  disableAnimations = true;

  private commentsQuery: QueryRef<any>;
  private commentsSubscription: Subscription;
  private offset = 0;

  comments: Comment[] = [];
  loading = true;
  counter = 0;

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    this.commentsQuery = this.apollo
      .watchQuery<any>({
        query: Query.ALL_COMMENTS_FOR_POST,
        variables: {
          id: this.post,
          first: COMMENTS_PER_QUERY,
          skip: this.offset,
        }
      });

    this.commentsQuery
      .valueChanges
      .subscribe(({ data: { Post }, loading }) => {
        this.counter = Post._commentsMeta.count;
        this.comments = Post.comments;
        this.loading = loading;
      });
  }

  loadMore() {
    this.loading = true;

    // fetch more
    return this.commentsQuery.fetchMore({
      variables: {
        skip: this.comments.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        console.log(previousResult, fetchMoreResult);
        return {
          // ...previousResult,
          Post: {
            ...previousResult.Post,
            comments: [...previousResult.Post.comments, ...fetchMoreResult.Post.comments],
          }
        };
      }
    });
  }

  ngAfterViewInit(): void {
    this.disableAnimations = false;
  }
}
