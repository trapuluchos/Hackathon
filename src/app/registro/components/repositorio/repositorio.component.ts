import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormControl } from '@angular/forms';
// import { EMPTY } from 'rxjs'
import { filter, switchMap, debounceTime, tap } from 'rxjs/operators';
import { GithubUserResponse, GithubRepoResponse } from '../../interfaces/github-response.interface';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styles: [
  ]
})
export class RepositorioComponent implements OnInit, OnDestroy {

  githubUsername = new FormControl('');
  repositorios: GithubRepoResponse[] = [];
  githubUser: GithubUserResponse | null = null;
  error: boolean = false;
  loading: boolean = false;

  subscription!: Subscription;

  constructor(
    private formService: FormService,
    private githubService: GithubService,
    private router: Router
  ) { }
  
  get repositoriosSeleccionados(): GithubRepoResponse[] {
    return this.formService.repositoriosSeleccionados;
  }

  ngOnInit(): void {

    // if( !this.formService.registerForm ) { this.router.navigateByUrl('/registro') }

    this.subscription = this.githubUsername.valueChanges
      .pipe(
        tap( _ => { 
          this.githubUser = null;
          this.repositorios = [];
          this.error = false;
          this.formService.limpiarSeleccionados();
        }),
        filter( value => value.length > 3 ),
        debounceTime(500),
        switchMap( value => {
          this.loading = true;
          return this.githubService.getGithubUser( value );
        })
      ).subscribe( resp => {
        this.loading = false;

        if ( resp !== null ) {
          this.githubUser = resp;
        } else {
          this.error = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRepoUser( url: string ) {
    this.loading = true;
    this.subscription = this.githubService.getRepoUser( url )
      .subscribe( resp => {
          this.error = false;
          this.loading = false;

          // this.githubUser = null;
          this.repositorios = resp;

    
      });
  }

  volver() {
    this.formService.limpiarSeleccionados();
    this.router.navigateByUrl('/registro');
  }

  

}
