import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GithubRepoResponse, GithubUserResponse } from '../interfaces/github-response.interface'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  private _baseUrl = environment.apiGithub

  constructor(private http: HttpClient) {}

  // get headers() {
  //   return new HttpHeaders().set(
  //     'Authorization',
  //     `token ${environment.githubToken}`,
  //   )
  // }

  getGithubUser(username: string): Observable<GithubUserResponse | null> {
    const url = `${this._baseUrl}/${username}`

    // return this.http.get<GithubUserResponse>(url, { headers: this.headers })
    return this.http.get<GithubUserResponse>(url)
      .pipe(
        // tap( _ => console.log(_) ),
        catchError((err) => {
          // console.log(err);
          return of(null)
        })
      )
  }


  getRepoUser(url: string): Observable<GithubRepoResponse[]> {
    // return this.http.get<GithubRepoResponse[]>(url, { headers: this.headers })
    return this.http.get<GithubRepoResponse[]>(url)
      .pipe(
        // tap( _ => console.log(_) ),
        catchError( (err) => {
          // console.log(err);
          return of([]) 
        })
      )
  }

  
}
