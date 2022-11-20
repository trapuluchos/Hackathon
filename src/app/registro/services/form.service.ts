import { Injectable } from '@angular/core';
import { InformacionPersonal } from '../interfaces/form.interface';
import { GithubRepoResponse } from '../interfaces/github-response.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _repositoriosSeleccionados: GithubRepoResponse[] = [];
  
  registerForm!: InformacionPersonal;

  constructor() { }

  get repositoriosSeleccionados(): GithubRepoResponse[] {
    return [ ...this._repositoriosSeleccionados ];
  }

  saveForm( values: InformacionPersonal ): void {
    this.registerForm = values;
  }

  agregarRepositorio( repositorio: GithubRepoResponse ): void {
    this._repositoriosSeleccionados.push( repositorio );
  }

  quitarRepositorio( id: number ) {
    this._repositoriosSeleccionados = this._repositoriosSeleccionados.filter( repo => repo.id !== id );
  }

  limpiarSeleccionados(): void {
    this._repositoriosSeleccionados = []; 
  }
}
