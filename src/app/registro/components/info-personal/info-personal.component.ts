import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swall from 'sweetalert2';

import { FormService } from '../../services/form.service';
import { calcularEdad } from '../../helpers/fechas';


@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styles: []
})
export class InfoPersonalComponent implements OnInit {

  esMayor: boolean = false;

  infoPersonalForm = this.fb.group({
    nombres: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
    apellidos: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(20) ]],
    ci: [ '', [ Validators.required, Validators.minLength(5), Validators.maxLength(9) ]],
    extension: [ '', [ Validators.required,] ],
    direccion: [ '', [ Validators.required, Validators.minLength(5) ] ],
    fechaNacimiento: ['', [ Validators.required ] ]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    const data = this.formService.registerForm;
    if ( data === undefined ) { return; }

    delete data.repositorios;

    this.infoPersonalForm.setValue( data );
  }

  nextForm(): void {
    if ( this.infoPersonalForm.invalid ) {
      this.infoPersonalForm.markAllAsTouched();
      return;
    }

    const edad = calcularEdad( this.infoPersonalForm.get( 'fechaNacimiento' )?.value ); 

    if ( edad > 30 ) {
      this.esMayor = true;

      Swall.fire({
        title: 'Oops!',
        icon: 'warning',
        html: `Lo sentimos, solo pueden inscribirse personas menores a 30 años.`
      });
      
      return;
    }

    this.formService.saveForm( this.infoPersonalForm.value );

    this.router.navigateByUrl('/registro/repositorio');

  }

  setClassName( name: string ): string {
    if ( this.infoPersonalForm.get(name)?.invalid && this.infoPersonalForm.get(name)?.touched ) {
      return 'form-control is-invalid';
    } else if ( this.infoPersonalForm.get(name)?.valid && this.infoPersonalForm.get(name)?.touched ) {
      return 'form-control is-valid';
    } else {
      return 'form-control';
    }
  }


}
