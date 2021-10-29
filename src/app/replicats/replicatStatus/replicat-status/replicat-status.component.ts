import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-replicat-status',
  templateUrl: './replicat-status.component.html',
  styleUrls: ['./replicat-status.component.css']
})
export class ReplicatStatusComponent implements OnInit {

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
