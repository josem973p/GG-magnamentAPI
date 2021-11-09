import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
//import * as $ from "jquery";
declare var $: any;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styles: [
    `
    *{
    margin: 0;
    padding: 0;
    margin-top: 0;
    box-sizing: border-box;
  }
  body{
    margin:   0;
    margin-top: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Muli', sans-serif;
    overflow: hidden;
    
  
  }
  
  
  .sidebar{
   position: fixed ;
  
    width: 250px;
    height: 100%;
    background-color: #46505c;
    color: #fff;
    outline: 1px solid #2a2a2a;
    
  
  }
  .sidebar h1{
    text-align: center;
    margin: 10px 10px;
    padding: 10px;
    background: (--primary);
  }
  
  .sidebar ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sidebar li {
    
    transition: all 0.5s;
  }
  
  .sidebar li:hover{
    background:#0e6ccf;
    border-left: 5px solid rgb(114, 114, 114);
  
  }
  .sidebar a {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 10px;
  }
  .nav-bar{
    width: 100%;
    height: 50px;
    position: fixed;
    background-color:rgb(202, 201, 201) ;
   transition: all 0.5s;
  }
  
  
  .main-container{
    width: 100%;
    height: 100vh;
    position: absolute;
    background: rgb(255, 255, 255);
    transition: all 0.5s;
  }
  .menu-bar{
    margin-left: 15px;
    cursor: pointer;
  }
  
  .abrir {
        transform: translateX(250px);
  }


  /***-----------------------------------*/

  .welcome{
    font-size: 40px;
  }

  .db-description{
    font-size:30px;
  }
  .click-table{
    font-size:18px;
  }
  .main-list ul{
    list-style: none;
    padding: 0;
    margin: 0;

  }
  .main-list li {
    
    transition: all 0.5s;
  }

  .main-list li:hover{
    background:#cfcfcf;
    border-left: 5px solid rgb(114, 114, 114);
  }

  .main-list a {
    display: block;
    color: #9d9fa0!important;
    font-weight: 500;
    text-decoration: none;
    padding: 10px;
    font-size:35px;
  }

  /*------------------------------------------------------- */
  .form-modal{
    width:100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill,19rem) ;
  grid-gap: 0.6rem;
  justify-content: center;
  }
  .form-modal div{
  width: 300px;
  }
  .form-modal div label{
  font-size: 13px;
  width: 80px !important;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 10px;
  }
  
  .form-modal input{
  padding: 2px;
  background-color: rgb(216, 215, 215);
  margin-left: 10px;
  border: 0;
  width: 200px!important;
  
  }
  
  .title-container{
    display:flex;
    justify-content:space-between ;
  }
  .title-container button{
    border: 0;
    background-color:#ff4759;
    height:30px;
    width:30px;
    border-radius:8px;
    margin: 10px;
  }
  
  .modal-content {
    display:flex;
    align-items: center;
    background-color:#f0f0f0;
   
  }
  .modal-dialog{
  min-width: 500px;
  max-width: 1300px;
  background-color: #f8f9fa;
  
  }
  .update-data-container{
  background-color: #f8f9fa;
  width:95%
  }
  .update-data-botones{
    display: flex;
    justify-content: space-between;
  }
  .update-data-button-container{
    
        width: 300px;
        
        display: flex;
        align-items: center;
        height: 80px;
    
  }
  
    `
  
  ]
})
export class AppComponent {
  

  public stop=false; 
  public start=false;
  public listExtracts= false;
  public listReports = false;
  public retrieveExtract = false;
  public extractStatus = false;
  public listReplicats= false;
  public replicatListsReports= false;
  public retrieveReplicat= false;
  public replicatStatus= false;
  public logs=false;
  public messages=false;
  public task=false;
  public extracts = false;
  public replicats = false;

  datos = {
    url: '',
    user:'',
    password:''
  };

  constructor( private modalService: NgbModal ) { }

  @ViewChild('content') someInput!: ElementRef ;
 


  element: any
  nodos: any
  boton: any
  open = false

  ngOnInit(): void {

   // this.openLg(this.someInput);
    this.abrir();
    
  }
  ngAfterViewInit(): void {
   
    this.openLg(this.someInput);

    // this.dtTrigger.next();

  }


  abrir() {
    if (this.open = false) {
      $('.nav-bar').toggleClass('abrir');
      $('.main-container').toggleClass('abrir');
     

    } else if (this.open = true) {
      $('.nav-bar').toggleClass('abrir');
      $('.main-container').toggleClass('abrir');
      
    }

    
  }
  mainPage() {
    location.reload();
    this.infoMain = true;
  }


  showServer = false
  showTable = false
  infoMain = true

  title = 'APP-rent-a-car-admin';

  agregarClase(id:any){

    let intro = document.getElementById('id');
    intro!.style.display = 'none';
  }



  agregar() {
    this.addserver();
    
  }
  url = `http://127.0.0.1:8080`;
  settings: any;
  addserver = async () => {
    try {
      const { hostname: location } = window.location;
      this.url = `${this.url}/credentials`;
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

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }


}
