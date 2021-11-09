import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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

  
 
  agregar() {
    this.addserver();
    
  }
  url = `http://127.0.0.1:8080`;
  settings: any;
  addserver = async () => {
    try {
      const { hostname: location } = window.location;
      this.url = `${this.url}/credentials/param`;
      this.settings = {
        method: 'POST',
        body: JSON.stringify(this.datos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      };

      const response = await fetch(this.url, this.settings);
      if (response.ok) {
        

        Swal.fire('Datos enviados!', 'Se registraron los datos de inicio de sesion', 'success');
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un error al enviar por favor revisa que la informacion sea correcta o intentalo mas tarde.',
        'error'
      );
    }

    this.url = `http://127.0.0.1:8080`;
  };



  data2: any;
  objeto2:any;
 
  getData(ruta2: string) {
    
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET',  `http://127.0.0.1:8080/extract/extractDetailFull`, true);
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
      this.data2 = await this.getData( `http://127.0.0.1:8080/extract/extractDetailFull`);
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
