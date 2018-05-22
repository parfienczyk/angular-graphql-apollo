import { Component, Input } from '@angular/core';

// shared
import { Post } from './../../models/Post';

// apollo
import { Apollo } from 'apollo-angular';
import * as Query from './../../graphql';  // GraphQL queries
import gql from 'graphql-tag';

const ONE_POST_LIKES_FRAGMENT = gql`
  fragment likes on Post {
      likes
    }
`;

@Component({
  selector: 'post-like',
  template: `
    <button (click)="like()">
      +1 LIKE <img src="https://png.icons8.com/ios/20/000000/applause.png">
    </button>
  `,
  styleUrls: ['./post-like.component.scss']
})
export class PostLikeComponent {

  @Input() post: Post;

  constructor(private apollo: Apollo) { }

  like() {
    const mutationSubscription = this.apollo.mutate({
      mutation: Query.LIKE_POST_MUTATION,
      variables: {
        id: this.post.id,
        likes: this.post.likes + 1,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePost: {
          __typename: 'Post',
          likes: this.post.likes + 1,
        },
      },
      update: (store, { data: { updatePost } }) => {
        // console.log(store);
        // console.log(updatePost);
        // this.updateStoreAfterVote(store, createVote, postId);


        const data: any = store.readFragment({
          id: `Post:${this.post.id}`,
          fragment: ONE_POST_LIKES_FRAGMENT,
        });

        store.writeFragment({
          id: `Post:${this.post.id}`,
          fragment: ONE_POST_LIKES_FRAGMENT,
          data: {
            ...data,
            likes: data.likes + 1,
          }
        });

        console.log('[readFragment]', data);

      }
    })
      .subscribe();

  }


}
