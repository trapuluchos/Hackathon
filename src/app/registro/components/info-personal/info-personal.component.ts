import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { calcularEdad } from '../../helpers/fechas';

import Swall from 'sweetalert2';
import { FormService } from '../../services/form.service';
import { InformacionPersonal } from '../../interfaces/form.interface';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styles: []
})
export class InfoPersonalComponent implements OnInit {

  esMayor: boolean = false;

  infoPersonalForm = this.fb.group({
    nombres: ['Jhojan', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
    apellidos: ['Mamani', [ Validators.required, Validators.minLength(5), Validators.maxLength(20) ]],
    ci: [ '12345678', [ Validators.required, Validators.minLength(5), Validators.maxLength(9) ]],
    extension: [ 'LP', [ Validators.required,] ],
    direccion: [ 'Av. Uno Calle B', [ Validators.required, Validators.minLength(5) ] ],
    fechaNacimiento: ['1999-03-19', [ Validators.required ] ]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    if ( this.formService.registerForm === undefined ) { return; }
    this.infoPersonalForm.setValue( this.formService.registerForm );
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
