import { Component, OnInit, Input } from '@angular/core';

import Swal from 'sweetalert2';

import { GithubRepoResponse } from '../../interfaces/github-response.interface';
import { FormService } from '../../services/form.service';

@Component({
  // selector: 'app-repo-item',
  selector: 'tr[app-repo-item]',
  templateUrl: './repo-item.component.html',
})
export class RepoItemComponent implements OnInit {

  @Input() repositorio!: GithubRepoResponse;
  seleccionado: boolean = false; 

  get repsotitoriosSeleccionados(): GithubRepoResponse[] {
    return this.formService.repositoriosSeleccionados;
  }

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
  }

  agregarRepo() {
    if ( this.repsotitoriosSeleccionados.length >= 2 ) {
      Swal.fire({
        title: 'Oops!',
        icon: 'warning',
        html: 'Solo puede seleccionar 2 repositorios.'
      });
      return;
    }
    this.formService.agregarRepositorio( this.repositorio );
    this.seleccionado = true;
  }

  quitarRepo() {
    this.formService.quitarRepositorio( this.repositorio.id );
    this.seleccionado = false;
  }
}
