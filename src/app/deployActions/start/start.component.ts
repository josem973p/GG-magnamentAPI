import { Component, OnInit } from '@angular/core';
import Swal from'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  deployment = {
    deploymentId: ''
    
  };


  
  agregar() {
    this.addserver();
  }
  url = `http://127.0.0.1:8080`;
  settings: any;
  addserver = async () => {
    try {
      const { hostname: location } = window.location;
      this.url = `${this.url}/deployment/start2`;
      this.settings = {
        method: 'POST',
        body: JSON.stringify(this.deployment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      
        },
      };

      const response = await fetch(this.url, this.settings);
      if (response.ok) {
        
        console.log(response);
        
        Swal.fire('Peticion enviada!', 'Se mando el StartDployment a OCI correctamente', 'success');

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











  
  ruta2 = `http://127.0.0.1:8080/deployment/start2`;

  data2: any;
  objeto2: any;
  getData(ruta2: string) {

    return new Promise((resolve, reject) => {
      this.settings = {
        method: 'POST',
        body: JSON.stringify(this.deployment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', ruta2, true,this.settings);
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

  isfound = false;
  isfound2 = false;

  SolveData = async () => {
    try {
      this.data2 = await this.getData(this.ruta2);
      if (this.data2 === 'Not mach found') {
        this.isfound = false;
        Swal.fire(
          'No se encontraron datos',
          'Por favor  revisa el dato a buscar e intantelo de nuevo',
          'error'
        );
      } else {
        this.isfound = true;
        this.objeto2 = JSON.parse(this.data2);


        this.deployment = this.objeto2;
        console.log(this.deployment);
      }
    } catch (error) {}
  };


}
