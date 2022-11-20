import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    ErrorMsgComponent
  ]
})
export class SharedModule { }
