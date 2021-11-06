import { Component, ElementRef, OnInit, Renderer2, ViewChild,ViewEncapsulation } from '@angular/core';
import {
  AfterViewInit,

  OnDestroy,
  
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, AfterViewInit, OnDestroy  {

  @ViewChild('content') someInput!: ElementRef ;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger:any = new Subject();
  data: any;
  message: any;

 // constructor(private renderer: Renderer2, private RequestService: RequestService) {}
  constructor(private renderer: Renderer2,private modalService: NgbModal) {}



  dato: any;
  element: any;
  nodos: any;
  boton: any;
  showForm = false;

  paramsStart = {
    "schema":"ogg:command",
    "name":"start",
    "processName":"",
    "processType":"extract"
  }

  paramsStop = {
    "schema":"ogg:command",
    "name":"stop",
    "processName":"",
    "processType":"extract"
  }
 


  ngOnInit(): void {
    this.fetchData('http://127.0.0.1:8080/extract/data').then(data => {
  
      this.objeto2 = data
      console.log(this.objeto2)
      this.dtTrigger.next();

    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      columns: [
        {
          title: 'Acciones',
          render: function (data: any, type: any, full: any) {
            return '<button type="button"  class="waves-effect btn start"  style="background-color:#00dd1e; width: 35px; height: 35px; margin: 0; padding: 0; border-radius:5px" ><img src="../assets/imagenes/play.png"  style="width: 25px; height: 25px; display: inline-block;  margin:0; padding: 0;"></button> <button class="waves-effect btn stop" style="background-color:#ff0019; width: 35px; height: 35px; margin: 0; padding: 0; border-radius:5px"><img src="../assets/imagenes/stop.png"  style="width: 25px; height: 25px; display: inline-block;  margin:0; padding: 0;"></button>  ';
          },
        },
        {
          title: 'NAME',
          data: 'NAME',
        },
        {
          title: 'STATUS',
          data: 'STATUS',
        },
        {
          title: 'LAST_STARTED',
          data: 'LAST_STARTED',
        },
        {
          title: 'LAG',
          data: 'LAG',
        },
        {
          title: 'SINCE_LAG_REPORTED',
          data: 'SINCE_LAG_REPORTED',
        },
        {
          title: 'POSITION',
          data: 'POSITION',
        },
     
      ],
    };

    
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      this.element = event.target;

      this.nodos = this.element.parentNode;

      this.boton = this.nodos.className;

      if (
        this.boton.includes('stop') ||
        this.boton.includes('start')
      ) {
        if (this.boton.includes('stop')) {
          this.nodos = this.nodos.parentNode;
          this.nodos = this.nodos.parentNode;
          console.log(' me tocaste!! soy un stop')
          

          let noditos: any;
          noditos = this.nodos.childNodes[1].textContent;
          console.log(noditos)
          this.paramsStop.processName=noditos
          this.agregarParametrosStop();

          this.stop().then(data => {
  
            //  this.objeto2 = data
              console.log(data)
             
        
            });
            this. rerender()
             
        
        } else if (this.boton.includes('start')) {
          console.log('me tocaste!! soy un start')
          this.nodos = this.nodos.parentNode;
          this.nodos = this.nodos.parentNode;

          let noditos: any;
          noditos = this.nodos.childNodes[1].textContent;
          console.log(noditos)
          this.paramsStart.processName=noditos
          this.agregarParametrosStart();

          this.start().then(data => {
  
          //  this.objeto2 = data
            console.log(data)
           
      
          });
          this. rerender()
           

        //  this.SolveData();

        }
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

      this.fetchData('http://127.0.0.1:8080/extract/data').then(data => {
  
      this.objeto2 = data
      console.log(this.objeto2)
      

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        columns: [
          {
            title: 'Acciones',
            render: function (data: any, type: any, full: any) {
              return '<button type="button"  class="waves-effect btn start"  style="background-color:#00dd1e; width: 35px; height: 35px; margin: 0; padding: 0; border-radius:5px" ><img src="../assets/imagenes/play.png"  style="width: 25px; height: 25px; display: inline-block;  margin:0; padding: 0;"></button> <button class="waves-effect btn stop" style="background-color:#ff0019; width: 35px; height: 35px; margin: 0; padding: 0; border-radius:5px"><img src="../assets/imagenes/stop.png"  style="width: 25px; height: 25px; display: inline-block;  margin:0; padding: 0;"></button>  ';
            },
          },
          {
            title: 'NAME',
            data: 'NAME',
          },
          {
            title: 'STATUS',
            data: 'STATUS',
          },
          {
            title: 'LAST_STARTED',
            data: 'LAST_STARTED',
          },
          {
            title: 'LAG',
            data: 'LAG',
          },
          {
            title: 'SINCE_LAG_REPORTED',
            data: 'SINCE_LAG_REPORTED',
          },
          {
            title: 'POSITION',
            data: 'POSITION',
          },
       
        ],
      };

      dtInstance.destroy();

      this.dtTrigger.next();



    });


       

      

   
    });
  }

  

  open = false;
  

  ruta2 = `http://127.0.0.1:8080/extract/data`;

  data2: any;
  objeto2: any;

 // objeto2 = {
//    "name":"",
 //   "status":"",
 //   "lastStarted":"",
 //   "lag":null,
 //   "sinceLagReported":null,
 //   "position":""
 // }
  
  fetchData(ruta: string) {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', ruta, true);
      xhttp.onreadystatechange = (() => {

        if (xhttp.readyState === 4) {


          (xhttp.status === 200) ?
            resolve(JSON.parse(xhttp.responseText))

            : Swal.fire(
              'Error de conexion ',
              'Por favor intentalo mas tarde',
              'error'
            )
        }
      });
      xhttp.send();
    })

  }

  // _______________________________-________START EXTRACT ______________________________________________________
  //Metodo para  mandar parametros

  agregarParametrosStart() {
    this.startExtract();
    
  }
  url = `http://127.0.0.1:8080`;
  settings: any;
  startExtract = async () => {
    try {
      const { hostname: location } = window.location;
      this.url = `${this.url}/credentials/taskParams`;
      this.settings = {
        method: 'POST',
        body: JSON.stringify(this.paramsStart),
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



// Metodo  para mandar la peticion

  rutaStart="http://127.0.0.1:8080/task/dotask"
  start() {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', this.rutaStart, true);
      xhttp.onreadystatechange = (() => {

        if (xhttp.readyState === 4) {


          (xhttp.status === 200) ?
            resolve(JSON.parse(xhttp.responseText))

            : Swal.fire(
              'Error de conexion ',
              'Por favor intentalo mas tarde',
              'error'
            )
        }
      });
      xhttp.send();
    })

  }

//___________________________STOP  EXTRACT__________________________________________________

 //Metodo para  mandar parametros

 agregarParametrosStop() {
  this.stopExtract();
  
}


stopExtract = async () => {
  try {
    const { hostname: location } = window.location;
    this.url = `${this.url}/credentials/taskParams`;
    this.settings = {
      method: 'POST',
      body: JSON.stringify(this.paramsStop),
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

// Metodo  para mandar la peticion
  rutaStop="http://127.0.0.1:8080/task/dotask"
  stop() {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', this.rutaStop, true);
      xhttp.onreadystatechange = (() => {

        if (xhttp.readyState === 4) {


          (xhttp.status === 200) ?
            resolve(JSON.parse(xhttp.responseText))

            : Swal.fire(
              'Error de conexion ',
              'Por favor intentalo mas tarde',
              'error'
            )
        }
      });
      xhttp.send();
    })

  }


 openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }


}
