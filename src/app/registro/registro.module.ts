import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RegistroRoutingModule } from './registro-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { RegistroComponent } from './registro.component';
import { InfoPersonalComponent } from './components/info-personal/info-personal.component';
import { RepositorioComponent } from './components/repositorio/repositorio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TableReposComponent } from './components/table-repos/table-repos.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';


@NgModule({
  declarations: [
    RegistroComponent,
    InfoPersonalComponent,
    RepositorioComponent,
    PerfilComponent,
    TableReposComponent,
    RepoItemComponent,
    CheckoutComponent,
    ConfirmacionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    RegistroRoutingModule,
    SharedModule
  ]
})
export class RegistroModule { }


