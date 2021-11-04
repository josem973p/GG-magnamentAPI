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
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  @ViewChild('content2') someInput!: ElementRef ;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger:any = new Subject();
  data: any;
  message: any;

 // constructor(private renderer: Renderer2, private RequestService: RequestService) {}
  constructor(private renderer: Renderer2, private fb: FormBuilder) {}


  dato: any;
  element: any;
  nodos: any;
  boton: any;
  showForm = false;
  ruta = 'http://127.0.0.1:5000/getAutos';

 



  ngOnInit(): void {
   

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      columns: [
        {
          title: 'Acciones',
          render: function (data: any, type: any, full: any) {
            return '<button type="button"  class="waves-effect btn actualizarAuto"  style="background-color:#ffce3bed; width: 35px; height: 35px; margin: 0; padding: 0; border-radius:5px" ><img src="../assets/imagenes/sync.svg"  style="width: 25px; height: 25px; display: inline-block;  margin:0; padding: 0;"></button> <button class="waves-effect btn borrarAuto" style="background-color:#fb2136; width: 35px; height: 35px; margin: 0; padding: 0; border-radius:5px"><img src="../assets/imagenes/trash-bin-outline.svg"  style="width: 25px; height: 25px; display: inline-block;  margin:0; padding: 0;"></button>  ';
          },
        },
        {
          title: 'ID',
          data: 'ID',
        },
        {
          title: 'MARCA',
          data: 'MARCA',
        },
        {
          title: 'MODELO',
          data: 'MODELO',
        },
        {
          title: 'CATEGORIA',
          data: 'CATEGORIA',
        },
        {
          title: 'PUERTAS',
          data: 'PUERTAS',
        },
        {
          title: 'PRECIO',
          data: 'PRECIO',
        },
        {
          title: 'ID_SOCIO',
          data: 'ID_SOCIO',
        }
      ],
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      this.element = event.target;

      this.nodos = this.element.parentNode;

      this.boton = this.nodos.className;

      if (
        this.boton.includes('borrarAuto') ||
        this.boton.includes('actualizarAuto')
      ) {
        if (this.boton.includes('borrarAuto')) {
          this.nodos = this.nodos.parentNode;
          this.nodos = this.nodos.parentNode;

          let noditos: any;
          noditos = this.nodos.childNodes[1].textContent;
          this.sweet3(noditos);
        } else if (this.boton.includes('actualizarAuto')) {
          this.nodos = this.nodos.parentNode;
          this.nodos = this.nodos.parentNode;

          let noditos: any;
          noditos = this.nodos.childNodes[1].textContent;

          this.SolveData(noditos);

        }
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
   
    });
  }

  auto = {
    id_auto: '',
    marca: '',
    modelo: '',
    categoria: '',
    puertas: '',
    precio: '',
    id_socio: '',
  };

  auto2 = {
    id_auto: '',
    marca: '',
    modelo: '',
    categoria: '',
    puertas: '',
    precio: '',
    id_socio: '',
  };

  open = false;
  

  ruta2 = ` http://127.0.0.1:5000/getAutoBy`;

  data2: any;
  objeto2: any;
  getData(ruta2: string, noditos: any) {
    ruta2 = `${ruta2}/${noditos}`;
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', ruta2, true);
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

  SolveData = async (noditos: any) => {
  
    try {
      this.data2 = await this.getData(this.ruta2, noditos);
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

        this.auto = this.objeto2;

      }
    } catch (error) {}
  };
  //_______________________________________AGREGAR_______________________________

  agregar() {
    this.addserver();
    /** 
    if (this.auto2.id_auto != '') {
      
    } else {
      Swal.fire(
        'Verifica los datos!',
        'No se puede mandar el campo "SERVIDOR_NOMBRE" vacio! ',
        'error'
      );
    } */
  }
  url = `http://127.0.0.1:5000`;
  settings: any;
  addserver = async () => {
    try {
      const { hostname: location } = window.location;
      this.url = `${this.url}/addAuto`;
      this.settings = {
        method: 'POST',
        body: JSON.stringify(this.auto2),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params:{
          token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiaG9sYSIsImV4cCI6MTYzMTUwNTA2NX0.bJx8p53XUYFpdGDJ0IxZOwLzT8d6c_7mSvAuk9gxtoo'
        }
      };

      const response = await fetch(this.url, this.settings);
      if (response.ok) {
        this.rerender();

        Swal.fire('Datos enviados!', 'Se añadio a la base de datos', 'success');
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un error al enviar por favor revisa que la informacion sea correcta o intentalo mas tarde.',
        'error'
      );
    }

    this.url = `http://127.0.0.1:5000`;
  };

  //_______________________________________ACTUALIZAR__________________________________________________________



  actualizar() {
    this.updateserver();
  }

  url2 = `http://127.0.0.1:5000`;

  settings2: any;
  updateserver = async () => {
    try {
      const { hostname: location } = window.location;

      this.url2 = `http://127.0.0.1:5000/updateAuto/${this.auto.id_auto}`;
      console.log(this.url2);
      this.settings2 = {
        method: 'PUT',
        body: JSON.stringify(this.auto),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(this.url2, this.settings2);
      if (response.ok) {
        this.rerender();
        Swal.fire(
          'Datos enviados!',
          'Se Actualizo el registro en  la base de datos',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un error al enviar por favor revisa que la informacion sea correcta o intentalo mas tarde.',
        'error'
      );
    }

    this.url = `http://127.0.0.1:5000`;
  };

  //__________________________________________________ELIMINAR__________________________________________________________
  async delete(noditos: any) {
    try {
      const response = await fetch(
        ` http://127.0.0.1:5000/delAuto/${noditos}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (response.ok) {
        this.rerender();
        Swal.fire(
          'Datos Eliminados!',
          'Se elimino el registro de  la base de datos',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un error al enviar, por favor revisa que la informacion sea correcta o intentalo mas tarde.',
        'error'
      );
    }
  }
  sweet() {
    Swal.fire({
      title: 'Deseas Confirmar el envio de los Datos?',
      text: 'Se enviara la peticion al servidor',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, confirmo el envio',
      cancelButtonText: 'No, deseo verificar los datos',
    }).then((result) => {
      if (result.value) {
        this.agregar();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Se cancelo el envio',
          'Los datos no se enviaron a la base de datos',
          'error'
        );
      }
    });
  }

  sweet2() {
    Swal.fire({
      title: 'Deseas Confirmar la actualizacion de los Datos?',
      text: 'Se enviara la peticion al servidor',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, confirmo el envio',
      cancelButtonText: 'No, deseo verificar los datos',
    }).then((result) => {
      if (result.value) {
        this.actualizar();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Se cancelo el envio',
          'Los datos no se enviaron a la base de datos',
          'error'
        );
      }
    });
  }

  sweet3(noditos: any) {
    Swal.fire({
      title: 'Deseas Confirmar la eliminacion de los Datos?',
      text: 'Se enviara la peticion al servidor',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, confirmo el envio',
      cancelButtonText: 'No, deseo verificar los datos',
    }).then((result) => {
      if (result.value) {
        this.delete(noditos);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Se cancelo el envio',
          'Los datos no se enviaron a la base de datos',
          'error'
        );
      }
    });
  }




}
