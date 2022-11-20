import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPersonalComponent } from './components/info-personal/info-personal.component';
import { RegistroComponent } from './registro.component';
import { RepositorioComponent } from './components/repositorio/repositorio.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroComponent,
    children: [
      { path: 'info-personal', component: InfoPersonalComponent },
      { path: 'repositorio', component: RepositorioComponent },
      { path: 'confirmacion', component: ConfirmacionComponent },
      { path: '', redirectTo: 'info-personal' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
