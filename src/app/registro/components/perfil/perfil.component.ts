import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GithubUserResponse } from '../../interfaces/github-response.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() githubUser!: GithubUserResponse | null;
  @Input() loading: boolean = false;
  @Output() onEmiterUrl: EventEmitter<string>  = new EventEmitter<string>();
  clickVerRepo: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onEmiterRepo( repoUrl: string ): void {
    if( this.clickVerRepo === 0 ) {
      this.onEmiterUrl.emit( repoUrl );
      this.clickVerRepo++;
    }

  }

}
