import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User, Token} from '../interfaces'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null

  constructor(private http: HttpClient) { }

  register(user: User):Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  //  Observable<Token> means that we retrive object with field token inside from backend  
  // when we make a req then wanna put token to local var with operator tap. {token} -> means that we pull out/destruc thoken
  login(user: User): Observable<Token> {
    return this.http.post<Token>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}: Token) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout(): void {
    this.setToken(null)
    localStorage.clear()
  }
}
