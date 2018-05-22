import { PostCreateComponent } from './post-create/post-create.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostLikeComponent } from './post-like/post-like.component';
import { PostVoteComponent } from './post-vote/post-vote.component';

export const components = [
  PostItemComponent,
  PostCreateComponent,
  PostLikeComponent,
  PostVoteComponent,
];

export * from './post-item/post-item.component';
export * from './post-create/post-create.component';
export * from './post-like/post-like.component';
export * from './post-vote/post-vote.component';
