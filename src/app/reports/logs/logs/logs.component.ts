import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  AfterViewInit,

  OnDestroy,
  
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTablesModule } from 'angular-datatables';



@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements  OnInit, AfterViewInit, OnDestroy {

  
  data2: any;
  getData(ruta2: string) {
    
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET',  `http://127.0.0.1:8080/logs/criticalEvents`, true);
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
      this.data2 = await this.getData( `http://127.0.0.1:8080/logs/criticalEvents`);
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

  //______________________________________________DATATABLES____________________________________

  @ViewChild('content2') someInput!: ElementRef ;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger:any = new Subject();
  data: any;
  message: any;

 // constructor(private renderer: Renderer2, private RequestService: RequestService) {}
  constructor(private renderer: Renderer2) {}


  dato: any;
  element: any;
  nodos: any;
  boton: any;
  showForm = false;

 

  ngOnInit(): void {
    this.fetchData('http://127.0.0.1:8080/logs/criticalEvents').then(data => {
  
      this.objeto2 = data
      console.log(this.objeto2)
      this.dtTrigger.next();

    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      columns: [
       
        {
          title: 'DATE',
          data: 'DATE',
        },
        {
          title: 'MESSAGE',
          data: 'MESSAGE',
        }
     
      ]
    };

    
  }

  ngAfterViewInit(): void {
  
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
            title: 'DATE',
            data: 'DATE',
          },
          {
            title: 'MESSAGE',
            data: 'MESSAGE',
          }
        ]
      };

      dtInstance.destroy();

      this.dtTrigger.next();



    });

   
    });
  }

  

  open = false;
  

  ruta2 = `http://127.0.0.1:8080/extract/data`;

 // data2: any;
  objeto2 :any;

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



}
