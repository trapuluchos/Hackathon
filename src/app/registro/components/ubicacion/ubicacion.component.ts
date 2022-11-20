import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { InformacionPersonal } from '../../interfaces/form.interface';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styles: [
  ]
})
export class UbicacionComponent implements OnInit {

  direccionForm = new FormGroup({
    direccion: new FormControl('', [ Validators.required, Validators.minLength(10) ])
  }); 

  constructor(
    private router: Router,
    private formService: FormService
  ) {}
  
  ngOnInit(): void {
    const dataLS: InformacionPersonal = JSON.parse( localStorage.getItem('hackathon')! );

    if ( dataLS?.direccion ) {
      this.direccionForm.get('direccion')?.setValue( dataLS.direccion );
    }
  }

  nextForm() {
    
    if ( this.direccionForm.invalid ) {
      this.direccionForm.markAllAsTouched();
      return;
    }

    this.formService.saveForm( this.direccionForm.value );
    this.router.navigateByUrl('/registro/repositorio');

  }


  setClassName( name: string ): string {
    if ( this.direccionForm.get(name)?.invalid && this.direccionForm.get(name)?.touched ) {
      return 'form-control is-invalid';
    } else if ( this.direccionForm.get(name)?.valid && this.direccionForm.get(name)?.touched ) {
      return 'form-control is-valid';
    } else {
      return 'form-control';
    }
  }
}
