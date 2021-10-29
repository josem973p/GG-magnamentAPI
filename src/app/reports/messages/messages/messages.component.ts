import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  
  data2: any;
  getData(ruta2: string) {
    
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET',  `http://127.0.0.1:8080/messages/getMessages`, true);
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
      this.data2 = await this.getData( `http://127.0.0.1:8080/messages/getMessages`);
      if (this.data2 === 'Not mach found') {
        
        Swal.fire(
          'No se encontraron datos',
          'Por favor  revisa el dato a buscar e intantelo de nuevo',
          'error'
        );
      } else {
        console.log("me ejecute");
        console.log(this.data2);
       // this.objeto2 = JSON.parse(this.data2);

        console.log("hola");

      }
    } catch (error) {}
  };

  obtener() {
    this.SolveData();
  }


}
