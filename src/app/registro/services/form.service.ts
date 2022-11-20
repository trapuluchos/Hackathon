import { Injectable } from '@angular/core';

import { Registro } from '../interfaces/form.interface';
import { GithubRepoResponse, GithubRepoSmall } from '../interfaces/github-response.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _repositoriosSeleccionados: GithubRepoResponse[] = [];
  registerForm!: Registro;

  constructor() { }

  get repositoriosSeleccionados(): GithubRepoResponse[] {
    return [ ...this._repositoriosSeleccionados ];
  }

  saveForm( values: Registro ): void {
    this.registerForm = values;
  }

  agregarRepositorio( repositorio: GithubRepoResponse ): void {
    this._repositoriosSeleccionados.push( repositorio );
  }

  construirRegistro() {

    const repoSmall: GithubRepoSmall[] = this._repositoriosSeleccionados.map( repo => {
      return { 
        nombre: repo.name, 
        estrellas: repo.stargazers_count, 
        enlace: repo.svn_url 
      };
    });

    this.registerForm = {
      ...this.registerForm,
      repositorios: repoSmall
    }

  }

  quitarRepositorio( id: number ) {
    this._repositoriosSeleccionados = this._repositoriosSeleccionados.filter( repo => repo.id !== id );
  }

  limpiarSeleccionados(): void {
    this._repositoriosSeleccionados = []; 
  }
  
  limpiarForm(): void {

    this.registerForm = {
      nombres: '',
      apellidos: '',
      ci: '',
      extension: '',
      fechaNacimiento: '',
      direccion: '',
      repositorios: []
    }
  }
}
