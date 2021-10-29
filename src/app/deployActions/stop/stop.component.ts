import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

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
      this.url = `${this.url}/deployment/stop2`;
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
        
        console.log(response.json);
        
        Swal.fire('Peticion enviada!', 'Se mando el StopDployment a OCI correctamente', 'success');

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


}
