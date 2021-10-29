import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-replicat-list-reports',
  templateUrl: './replicat-list-reports.component.html',
  styleUrls: ['./replicat-list-reports.component.css']
})
export class ReplicatListReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  datos = {
    url: '',
    user:'',
    password:'',
    parametro:''
  };
}
