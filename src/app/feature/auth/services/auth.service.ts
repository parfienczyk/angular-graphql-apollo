import { Injectable } from '@angular/core';

// rxJS
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// const
import { GC_AUTH_TOKEN, GC_USER_ID } from '@app/constants';

@Injectable()
export class AuthService {

  private _isAuthenticated = new BehaviorSubject(false);

  constructor() {
  }

  get isAuthenticated(): Observable<any> {
    return this._isAuthenticated.asObservable();
  }

  public get userId() {
    return localStorage.getItem('app-blog-user-id');
  }
  get userName() {
    return localStorage.getItem('app-blog-user-name');
  }
  get userEmail() {
    return localStorage.getItem('app-blog-user-email');
  }

  saveUserData(id: string, token: string) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.setUserId(id);
  }

  setUserId(id: string) {
    this._isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem('app-blog-user-id');
    localStorage.removeItem('app-blog-user-name');

    this._isAuthenticated.next(false);
  }

  autoLogin() {
    const id = localStorage.getItem(GC_USER_ID);

    if (id) {
      this.setUserId(id);
    }
  }
}
