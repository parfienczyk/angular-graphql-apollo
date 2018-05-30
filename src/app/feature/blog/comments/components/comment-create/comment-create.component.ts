import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// apollo
import { Apollo } from 'apollo-angular';
import * as GQL from './../../graphql';  // GraphQL queries

// common
import { Post } from '../../../posts/models/Post';
import { AuthService } from '@app/feature/auth/services/auth.service';

const MAX_LENGTH_COMMENT = 250;

@Component({
  selector: 'comment-create',
  template: `
    <form [formGroup]="form" novalidate (submit)="onSubmit()">
      <input
        type="text" class="form-control"
        formControlName="content"
        placeholder="Add comment..."
        maxlength="260">
      <button
        type="submit"
        [disabled]="!form.valid"
        class="btn btn-primary">
        Add
      </button>
    </form>
  `,
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  form: FormGroup;
  postId: string;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe(({ id }) => {
      this.postId = id;
    });
  }

  createForm() {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(MAX_LENGTH_COMMENT)]],
    });
  }

  onSubmit() {
    this.onAddComment(this.form.value);
  }

  private onAddComment(data) {
    const { content } = data;

    this.apollo.mutate({
      mutation: GQL.CREATE_COMMENT_MUTATION,
      variables: {
        content,
        postId: this.postId,
        authorId: this.authService.userId
      },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   createComment: {
      //     __typename: 'Comment',
      //     post: {
      //       __typename: 'Post',
      //       id: this.postId
      //     },
      //     id: -1,
      //     content: content,
      //     createdAt: +new Date,
      //   },
      // },
      update: (store, { data: { createComment } }) => {
        this.updateStoreWithFragment(store, createComment);
      },
    })
      .subscribe(
      ({ data }) => {
        console.log('[subscribe]: ', data);
        this.form.reset();
      },
      (error) => console.log('error:', error)
      );
  }

  private updateStoreWithFragment(store, newComment) {
    const storeCache: any = store.readFragment({
      id: `Post:${this.postId}`,
      fragment: GQL.ONE_POSTS_QUERY_FRAGMENT,
    });

    // update store cache
    storeCache.comments = [newComment, ...storeCache.comments];
    storeCache._commentsMeta.count++;

    store.writeFragment({
      id: `Post:${this.postId}`,
      fragment: GQL.ONE_POSTS_QUERY_FRAGMENT,
      data: {
        ...storeCache,
      }
    });
  }

  private updateStoreWithQuery(store, createComment) {
    // Read the data from our cache for this query
    const data: any = store.readQuery({
      query: GQL.ALL_COMMENTS_FOR_POST,
      variables: {
        id: this.postId,
        first: 5,
        skip: 0,
        orderBy: 'createdAt_DESC',
      }
    });

    console.log('comment:', createComment);
    // console.log('data:', data);

    // Add our comment from the mutation to the end
    // data2.comments.push(createComment);

    // console.log('[readQuery]', data);
    // console.log('[readFragment]', data2);

    // // Add our comment from the mutation to the end
    // // data.Post.comments.push(createComment);

    // Add our comment from the mutation to the start
    data.Post.comments = [createComment, ...data.Post.comments];
    data.Post._commentsMeta.count++;
    // // Write our data back to the cache.
    store.writeQuery({
      query: GQL.ALL_COMMENTS_FOR_POST,
      variables: {
        id: this.postId,
        // orderBy: 'createdAt_DESC',
      },
      data
    });
  }

}
