import { Component, Input, OnInit } from '@angular/core';
import { GithubRepoResponse } from '../../interfaces/github-response.interface';

@Component({
  selector: 'app-table-repos',
  templateUrl: './table-repos.component.html'
})
export class TableReposComponent implements OnInit {

  @Input() repositorios: GithubRepoResponse[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  

}
