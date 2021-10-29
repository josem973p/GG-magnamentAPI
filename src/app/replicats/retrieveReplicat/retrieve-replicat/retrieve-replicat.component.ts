import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrieve-replicat',
  templateUrl: './retrieve-replicat.component.html',
  styleUrls: ['./retrieve-replicat.component.css']
})
export class RetrieveReplicatComponent implements OnInit {

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
