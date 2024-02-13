import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validaciones } from './validaciones';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  telefonoRegex = /^[6-9][0-9]{8}$/;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  cpRegex = /^(5[0-2]|[1-4][0-9]|0[1-9])[0-9]{3}$/;
  fechaRegex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/ ;
  tipoDocumentoRegex = /(1|2|3)/;
  cantidad = /^[1-9][0-9]{0,3}$/;
  precioRegex = /\d{1,10}/;
  provinciasArray = [{ nombre: '' },{ nombre: 'Álava' },{ nombre: 'Albacete' },{ nombre: 'Alicante' },{ nombre: 'Almería' },{ nombre: 'Ávila' },{ nombre: 'Badajoz' },{ nombre: 'Baleares' },{ nombre: 'Barcelona' },{ nombre: 'Burgos' },{ nombre: 'Cáceres' },{ nombre: 'Cádiz' },{ nombre: 'Castellón' },{ nombre: 'Ciudad Real' },{ nombre: 'Córdoba' },{ nombre: 'La Coruña' },{ nombre: 'Cuenca' },{ nombre: 'Gerona' },{ nombre: 'Granada' },{ nombre: 'Guadalajara' },{ nombre: 'Guipúzcoa' },{ nombre: 'Huelva' },{ nombre: 'Huesca' },{ nombre: 'Jaén' },{ nombre: 'León' },{ nombre: 'Lérida' },{ nombre: 'La Rioja' },{ nombre: 'Lugo' },{ nombre: 'Madrid' },{ nombre: 'Málaga' },{ nombre: 'Murcia' },{ nombre: 'Navarra' },{ nombre: 'Orense' },{ nombre: 'Asturias' },{ nombre: 'Palencia' },{ nombre: 'Las Palmas' },{ nombre: 'Pontevedra' },{ nombre: 'Salamanca' },{ nombre: 'Santa Cruz de Tenerife' },{ nombre: 'Cantabria' },{ nombre: 'Segovia' },{ nombre: 'Sevilla' },{ nombre: 'Soria' },{ nombre: 'Tarragona' },{ nombre: 'Teruel' },{ nombre: 'Toledo' },{ nombre: 'Valencia' },{ nombre: 'Valladolid' },{ nombre: 'Vizcaya' },{ nombre: 'Zamora' },{ nombre: 'Zaragoza' },{ nombre: 'Ceuta' },{ nombre: 'Melilla' }]

  provincia?: string = "";

    numeroFactura = 1;
    baseImponible21 : number = 0;
    baseImponible10 : number = 0;
    baseImponible4 : number = 0;
    iva21 : number = 0;
    iva10 : number = 0;
    iva4 : number = 0; 
    precioTotal : number = 0;
    valor1 = ((Math.random() * 100) + 1).toFixed(0);
    valor2 = ((Math.random() * 100) + 1).toFixed(0);
    suma : string = "";

 formularioContacto = new FormGroup({
  numeroFactura: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
  nombre: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(20) ]),
  fecha: new FormControl('',[Validators.required, Validators.pattern(this.fechaRegex), Validaciones.fecha]),
  direccion: new FormControl ('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
  ciudad: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
  tipoDocumento : new FormControl('-', [Validators.pattern(this.tipoDocumentoRegex)]),
  numeroDocumento: new FormControl('', [Validators.required, Validaciones.validarDNI]),
  codigop: new FormControl('',[Validators.required, Validators.pattern(this.cpRegex)]),
  telefono: new FormControl('', [Validators.required, Validators.pattern(this.telefonoRegex)]),
  email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
 })


 formularioSegundo = new FormGroup({
  nombreArticulo : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
  cantidad: new FormControl('', [Validators.required, Validators.pattern(this.cantidad)]),
  precio : new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(this.precioRegex)]),
  ivaSeleccionado: new FormControl ('21')
});

lineaPedido: {numero: number; articulo: string; cantidad:number; precio:number; iva_porcentaje:number; iva: number; base:number; total:number;} []= []

 modificarProvincia(){
  if(this.formularioContacto.value.codigop?.length == 5){
    let posicion: number = Number(this.formularioContacto.value.codigop.substring(0,2));
    this.provincia = this.provinciasArray[posicion].nombre || "CP no valido";
  } else {
    this.provincia = "CP no valido"
  }
}

agregarProducto(){
  if(this.formularioSegundo.valid){
    let numero = this.numeroFactura++;
    let articulo = this.formularioSegundo.value.nombreArticulo || "hola";
    let cantidad = Number(this.formularioSegundo.value.cantidad);
    let precio = Number(this.formularioSegundo.value.precio);
    let iva_porcentaje = Number(this.formularioSegundo.value.ivaSeleccionado);
    let iva = (Number(iva_porcentaje) * (Number(precio) * Number(cantidad)))/100;
    let base = (Number(cantidad) * Number(precio));
    let total = base + iva;

   this.lineaPedido.push(
     {
       numero, articulo, cantidad, precio, iva_porcentaje, iva, base, total
     }
   );
  this.ordenar();
  } else {
    alert("NO SE PUEDE AÑADIR EL PRODUCTO")
  }
}

ordenar(){
  this.numeroFactura = 1;
  this.lineaPedido.map(linea => linea.numero = this.numeroFactura++)
  this.limpiarCasillas()
  for(let i = 0; i < this.lineaPedido.length; i++){
    if(this.lineaPedido[i].iva_porcentaje == 4){
      this.baseImponible4 += this.lineaPedido[i].base;
      this.iva4 += this.lineaPedido[i].iva;
      this.precioTotal += this.lineaPedido[i].total;
    } else if(this.lineaPedido[i].iva_porcentaje == 10){
      this.baseImponible10 += this.lineaPedido[i].base;
      this.iva10 += this.lineaPedido[i].iva;
      this.precioTotal += this.lineaPedido[i].total;
    } else {
      this.baseImponible21 += this.lineaPedido[i].base;
      this.iva21 += this.lineaPedido[i].iva;
      this.precioTotal += this.lineaPedido[i].total;
    }
  }
}

eliminarProducto(posicion : number){
  this.lineaPedido.splice(posicion - 1, 1);   
  this.ordenar();
 }

 limpiarCasillas(){
  this.baseImponible21 = 0;
  this.baseImponible10 = 0;
  this.baseImponible4 = 0;
  this.iva21 = 0;
  this.iva10 = 0;
  this.iva4 = 0; 
  this.precioTotal = 0;
}

validarFormulario() : Boolean{
  if(Number(this.suma) == (Number(this.valor1) + Number(this.valor2))){
    if(this.formularioContacto.valid){
      if(this.lineaPedido.length != 0){
        //this.service.grabarFactura(this.formularioContacto.value) Enviamos los datos a través del metodo del servicio "grabarFactura()"
        alert("DATOS ENVIADOS AL SERVICIO")
        return true
      } else {
        alert("NO HAY LINEAS DE PEDIDOS")
        return false;
      }
    } else {
      alert("ERROR EN ALGUN DATO DEL FORMULARIO")
      return false;
    }
  } else {
    alert("CAPTACHA INVALIDO")
    this.valor1 = ((Math.random() * 100) + 1).toFixed(0);
    this.valor2 = ((Math.random() * 100) + 1).toFixed(0);
    return false;
  }
}


}
