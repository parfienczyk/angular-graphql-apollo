import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// apollo
import { Apollo, QueryRef } from 'apollo-angular';
import * as GQL from './../../graphql';  // GraphQL queries

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { username, password } = this.form.value;

    // get One Post
    this.apollo
      .watchQuery<any>({
        query: GQL.ONE_USER_QUERY,
        variables: {
          email: username
        }
      })
      .valueChanges
      .subscribe(({ data: { User }, loading }) => {
        this.loading = loading;

        localStorage.setItem('app-blog-user-id', User.id);
        localStorage.setItem('app-blog-user-name', `${User.firstName} ${User.lastName}`);

        this.router.navigate(['/posts']);
      });
  }
}
