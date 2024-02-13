import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  telefonoRegex = /^[6-9][0-9]{8}$/;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  cpRegex = /^(5[0-2]|[1-4][0-9]|0[1-9])[0-9]{3}$/;
  provinciasArray = [{ nombre: '' },{ nombre: 'Álava' },{ nombre: 'Albacete' },{ nombre: 'Alicante' },{ nombre: 'Almería' },{ nombre: 'Ávila' },{ nombre: 'Badajoz' },{ nombre: 'Baleares' },{ nombre: 'Barcelona' },{ nombre: 'Burgos' },{ nombre: 'Cáceres' },{ nombre: 'Cádiz' },{ nombre: 'Castellón' },{ nombre: 'Ciudad Real' },{ nombre: 'Córdoba' },{ nombre: 'La Coruña' },{ nombre: 'Cuenca' },{ nombre: 'Gerona' },{ nombre: 'Granada' },{ nombre: 'Guadalajara' },{ nombre: 'Guipúzcoa' },{ nombre: 'Huelva' },{ nombre: 'Huesca' },{ nombre: 'Jaén' },{ nombre: 'León' },{ nombre: 'Lérida' },{ nombre: 'La Rioja' },{ nombre: 'Lugo' },{ nombre: 'Madrid' },{ nombre: 'Málaga' },{ nombre: 'Murcia' },{ nombre: 'Navarra' },{ nombre: 'Orense' },{ nombre: 'Asturias' },{ nombre: 'Palencia' },{ nombre: 'Las Palmas' },{ nombre: 'Pontevedra' },{ nombre: 'Salamanca' },{ nombre: 'Santa Cruz de Tenerife' },{ nombre: 'Cantabria' },{ nombre: 'Segovia' },{ nombre: 'Sevilla' },{ nombre: 'Soria' },{ nombre: 'Tarragona' },{ nombre: 'Teruel' },{ nombre: 'Toledo' },{ nombre: 'Valencia' },{ nombre: 'Valladolid' },{ nombre: 'Vizcaya' },{ nombre: 'Zamora' },{ nombre: 'Zaragoza' },{ nombre: 'Ceuta' },{ nombre: 'Melilla' }]

  provincia?: string;

 formularioContacto = new FormGroup({
  numeroFactura: new FormControl('',[]),
  nombre: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(20) ]),
  fecha: new FormControl('',),
  direccion: new FormControl ('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
  codigop: new FormControl('',[Validators.required, Validators.pattern(this.cpRegex)]),
  telefono: new FormControl('', [Validators.required, Validators.pattern(this.telefonoRegex)]),
  email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
 })

 submit(){

 }

 modificarProvincia(){
  if(this.formularioContacto.value.codigop?.length == 5){
    let posicion: number = Number(this.formularioContacto.value.codigop.substring(0,2));
    this.provincia = this.provinciasArray[posicion].nombre || "El CP es invalido";
  } else {
    this.provincia = "El CP es invalido"
  }
}
}
