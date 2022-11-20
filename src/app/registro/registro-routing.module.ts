import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPersonalComponent } from './components/info-personal/info-personal.component';
import { RegistroComponent } from './registro.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { RepositorioComponent } from './components/repositorio/repositorio.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroComponent,
    children: [
      { path: 'info-personal', component: InfoPersonalComponent },
      { path: 'ubicacion', component: UbicacionComponent },
      { path: 'repositorio', component: RepositorioComponent },
      { path: '', redirectTo: 'info-personal' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
