import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrieve-extract',
  templateUrl: './retrieve-extract.component.html',
  styleUrls: ['./retrieve-extract.component.css']
})
export class RetrieveExtractComponent implements OnInit {

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
