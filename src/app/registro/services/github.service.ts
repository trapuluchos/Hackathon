import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, of } from 'rxjs'
import { environment } from '../../../environments/environment'
import { GithubRepoResponse, GithubUserResponse } from '../interfaces/github-response.interface'

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  private _baseUrl = environment.apiGithub

  constructor(private http: HttpClient) {}

  get headers() {
    return new HttpHeaders().set(
      'Authorization',
      `token ${environment.githubToken}`,
    )
  }

  getGithubUser(username: string): Observable<GithubUserResponse | null> {
    const url = `${this._baseUrl}/${username}`

    return this.http
      .get<GithubUserResponse>(url, { headers: this.headers })
      .pipe(catchError((err) => of(null)))
  }


  getRepoUser(url: string): Observable<GithubRepoResponse[]> {
    // const url = `${this._baseUrl}/${username}/repos`

    // const headers = { "Authorization": `token ${ environment.githubToken }` };
    return this.http
      .get<GithubRepoResponse[]>(url, { headers: this.headers })
      .pipe(catchError((err) => of([])))
  }

  
}
