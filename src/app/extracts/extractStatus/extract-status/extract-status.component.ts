import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extract-status',
  templateUrl: './extract-status.component.html',
  styleUrls: ['./extract-status.component.css']
})
export class ExtractStatusComponent implements OnInit {

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
