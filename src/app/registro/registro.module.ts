import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RegistroRoutingModule } from './registro-routing.module';

import { RegistroComponent } from './registro.component';
import { InfoPersonalComponent } from './components/info-personal/info-personal.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { RepositorioComponent } from './components/repositorio/repositorio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TableReposComponent } from './components/table-repos/table-repos.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';


@NgModule({
  declarations: [
    RegistroComponent,
    InfoPersonalComponent,
    UbicacionComponent,
    RepositorioComponent,
    PerfilComponent,
    TableReposComponent,
    RepoItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroRoutingModule,
    SharedModule
  ]
})
export class RegistroModule { }
