import { Component, OnInit, Input } from '@angular/core';

// apollo
import { Apollo } from 'apollo-angular';
import * as GQL from './../../graphql';  // GraphQL queries


@Component({
  selector: 'post-item',
  template: `
    <article>
      <!-- <img src="https://placeimg.com/640/200/any" alt=""> -->

      <h4 [routerLink]="['/post', post.id]">{{ post.title }}</h4>
      <div class="description">{{ post.description }}</div>

      <section class="info">
        <span>{{ post.createdAt|date:'short' }}</span>
        <span>
          <img src="https://png.icons8.com/ios/20/000000/chat.png">
          Comments ({{ post._commentsMeta.count }})
        </span>
        <span>
          <img src="https://png.icons8.com/ios/20/000000/applause.png">
          Votes ({{ post.votes.length }})
        </span>
      </section>
      <button class="btn btn-delete" (click)="onDelete(post.id)">DELETE</button>
    </article>
  `,
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() post;

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() { }

  onDelete(postId) {
    const dialogTextMessage = 'Do you want to delete this Post?';

    if (confirm(dialogTextMessage)) {
      this.apollo
        .mutate({
          mutation: GQL.DELETE_POST_MUTATION,
          variables: {
            id: postId,
          },
          update: (store, { data: { deletePost } }) => {
            this.updateStoreAfterDelete(store, deletePost);
          },
        })
        .subscribe(
        ({ data }) => this.onDeleteSuccess(data),
        (error) => this.onDeleteError(error)
        );
    }
  }

  private updateStoreAfterDelete(store, deletePost) {
    const data = store.readQuery({
      query: GQL.ALL_POSTS_QUERY
    });

    // delete from list
    const index = data.allPosts.map((x) => x.id).indexOf(deletePost.id);
    data.allPosts.splice(index, 1);

    store.writeQuery({
      query: GQL.ALL_POSTS_QUERY, data
    });
  }

  private onDeleteSuccess(data) {
    console.log('[SUCCESS]:', data);
  }

  private onDeleteError(error) {
    console.log('[ERROR]: ', error);
    alert(error);
  }

}
