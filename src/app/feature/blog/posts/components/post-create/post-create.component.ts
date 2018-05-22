import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// apollo
import { Apollo } from 'apollo-angular';
import * as GQL from './../../graphql';  // GraphQL queries/mutations/subscriptions

@Component({
  selector: 'post-create',
  template: `
    <h3>CREATE POST:</h3>
    <form [formGroup]="form" novalidate (submit)="onSubmit()">
      <div>
        <input type="text" class="form-control" formControlName="title" placeholder="Title">
      </div>
      <div>
        <textarea formControlName="description" placeholder="Description..." cols="30" rows="10"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="!form.valid">Add</button>
    </form>
  `,
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.createLink(this.form.value);
  }

  createLink(data) {
    const { title, description } = data;

    this.apollo.mutate({
      mutation: GQL.CREATE_POST_MUTATION,
      variables: {
        title,
        description,
      },
      // update: (store, { data: { createPost } }) => {
      //   this.updateStoreAfterCreate(store, createPost);
      // },
    })
      .subscribe(
      ({ data }) => {
        console.log(data);
        this.form.reset();
      },
      (error) => console.log('error:', error)
      );
  }

  private updateStoreAfterCreate(store, createPost) {
    const data = store.readQuery({
      query: GQL.ALL_POSTS_QUERY
    });

    data.allPosts.push(createPost);
    store.writeQuery({ query: GQL.ALL_POSTS_QUERY, data });
  }

}
