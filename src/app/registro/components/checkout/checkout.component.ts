import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { FormService } from '../../services/form.service';
import { Registro } from '../../interfaces/form.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {

  msgEmail: string = '';
  msgWhatsapp: string = '';


  constructor(
    private formService: FormService,
    private router: Router
  ) { }

  get infoPersonal(): Registro {
    return this.formService.registerForm!;
  }

  ngOnInit(): void {
    ( !this.formService.registerForm ) && this.router.navigateByUrl('/registro');

    this.msgEmail = `mailto:hackathon@acme.com?subject=Inscripción%20para%20la%20hackathon%202022&body=${this.getRepoMensaje()}`;

    this.msgWhatsapp = `https://wa.me/59173575120?text=${this.getRepoMensaje()}`;
  }

  
  getRepoMensaje(): string {
    let reposMsg = `Inscripción%20para%20la%20hackathon%202022%0AMi%20nombre%20es:%20${this.infoPersonal?.nombres}%20${this.infoPersonal?.apellidos}%0ACedula%20de%20Identidad:%20${this.infoPersonal?.ci}%20${this.infoPersonal?.extension}%0AMis%20repositorios%20para%20la%20inscripción%20son%20los%20siguientes:%0A`;
    
    this.infoPersonal?.repositorios?.forEach( repo => {
      reposMsg += `Repositorio:%20${repo?.nombre}%20-%20Enlace:%20${repo?.enlace}%0A`
    });

    reposMsg += `Gracias%20de%20antemano%20por%20tiempo.%0A${this.infoPersonal?.nombres}%20${this.infoPersonal?.apellidos}`;

    return reposMsg;
  }

  enviar( opcion: number) {
     
    Swal.fire({
      title: `Enviar inscripción por ${ opcion == 1 ? 'Email?' : 'Whatsapp?' }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if ( opcion == 1 ) {
          window.location.href = this.msgEmail;
        } 
        if ( opcion == 2 ) {
          // window.location.href = this.msgWhatsapp;
          window.open( this.msgWhatsapp, '_blank');
          
        }

        this.formService.limpiarForm();
        this.formService.limpiarSeleccionados();
        this.router.navigateByUrl('/registro');
      }
    })
  }

}
