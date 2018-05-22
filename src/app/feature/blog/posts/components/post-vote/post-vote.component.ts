import { Component, Input } from '@angular/core';

// apollo
import { Apollo } from 'apollo-angular';
import * as Query from './../../graphql';  // GraphQL queries

@Component({
  selector: 'post-vote',
  template: `
    <button (click)="upvote()">
      +1 VOTE <img src="https://png.icons8.com/ios/20/000000/hearts.png">
    </button>
  `,
  styleUrls: ['./post-vote.component.scss']
})
export class PostVoteComponent {

  @Input() postId: number;

  constructor(private apollo: Apollo) { }

  upvote() {
    const mutationSubscription = this.apollo.mutate({
      mutation: Query.CREATE_VOTE_MUTATION,
      variables: {
        userId: 'cjf88j2ap6vx40102inaxxv3p',
        postId: this.postId
      },
      update: (store, { data: { createVote } }) => {
        // this.updateStoreAfterVote(store, createVote, postId);
      }
    })
      .subscribe();

  }

}
