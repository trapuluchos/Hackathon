import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, switchMap, debounceTime, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { GithubService } from '../../services/github.service';
import { FormService } from '../../services/form.service';
import { GithubUserResponse, GithubRepoResponse } from '../../interfaces/github-response.interface';


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

    if( this.formService.registerForm.nombres.trim() === '' ) { this.router.navigateByUrl('/registro') }

    this.formService.limpiarSeleccionados();
    
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

  next() {
    let ul: string = '<ul class="list-group">';

    this.repositoriosSeleccionados.forEach( repo => {
      ul+= `<li class="list-group-item text-center">* ${ repo.name }</li>`
    });

    ul += '</ul>';

    Swal.fire({
      title: 'Esta seguro de enviar los siguientes repositorios?',
      html: ul,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formService.construirRegistro();
        this.router.navigateByUrl('/registro/confirmacion');
      }
    })
  }

}
