import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: 'posts',
    component: fromContainers.PostsListComponent,
    children: []
  },
  {
    path: 'post/:id',
    component: fromContainers.PostShowComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
