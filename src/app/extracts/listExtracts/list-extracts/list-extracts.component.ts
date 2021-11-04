import { Component, OnInit } from '@angular/core';
import { ProcessInterface } from 'src/app/interfaces/processInterface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-extracts',
  templateUrl: './list-extracts.component.html',
  styleUrls: ['./list-extracts.component.css']
})
export class ListExtractsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

  datos = {
    url: '',
    user:'',
    password:''
  };


  data2:any ;
  objeto2!:ProcessInterface;
  url = `http://127.0.0.1:8080/extract/listExtract`;

 

  getData(ruta2: string) {
    
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET',  `http://127.0.0.1:8080/extract/listExtract`, true);
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          xhttp.status === 200
            ? resolve(xhttp.responseText)
            : reject(new Error('Error'));
        }
      };
      xhttp.send();
    });
  }

  SolveData = async () => {
  //  this.url = `${this.url}/extract/listExtract`;
    try {
      this.data2 = await this.getData( `http://127.0.0.1:8080/extract/listExtract`);
    //  this.data2= JSON.parse(this.data2);
     
      if (this.data2 === 'Not mach found') {
        
        Swal.fire(
          'No se encontraron datos',
          'Por favor  revisa el dato a buscar e intantelo de nuevo',
          'error'
        );
      } else {
      
       // console.log(  JSON.parse(this.data2));
        this.objeto2 = this.data2;
        console.log(this.objeto2.response.items);

        

      }
    } catch (error) {}
  };

  obtener() {
    this.SolveData();
  

    
  }

  






  agregar() {
    this.addserver();
    
  }
  url2 = `http://127.0.0.1:8080`;
  settings: any;
  addserver = async () => {
    try {
      const { hostname: location } = window.location;
      this.url2 = `${this.url2}/extract`;
      this.settings = {
        method: 'POST',
        body: JSON.stringify(this.datos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      };

      const response = await fetch(this.url2, this.settings);
      if (response.ok) {
        

        Swal.fire('Datos enviados!', 'Se registraron los datos de inicio de sesion', 'success');
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'si llegue',
        'error'
      );
    }

    this.url2 = `http://127.0.0.1:8080`;
  };

 item = {
  value:""

 }

 namedata:String=""

 


}
