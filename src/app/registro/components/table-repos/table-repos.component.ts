import { Component, Input, OnInit } from '@angular/core';
import { GithubRepoResponse } from '../../interfaces/github-response.interface';

@Component({
  selector: 'app-table-repos',
  templateUrl: './table-repos.component.html'
})
export class TableReposComponent implements OnInit {

  @Input() repositorios: GithubRepoResponse[] = [];
  dtOptions: DataTables.Settings = {};


  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      }
    };
  }

  

}
