import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Validaciones {
    static validarDNI(control: AbstractControl) : ValidationErrors | null{
        if(control.value.length == 9){
          let dni: string = control.value;
          let numero = Number(dni.substring(0,8));
          let letra = dni.substring(8,9);
          let posicion = numero % 23;
          let letras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B","N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E", "T"]
          let letraCorrecta = letras[posicion];
  
          if(letra.toUpperCase() == letraCorrecta){
            return null;
          } else {
            return {validarDNI : true}
          }
        } else {
          return null;
        }
      }
      
    static fecha(control: AbstractControl) : ValidationErrors| null {
        if(control.value){
            let fechaUsuario : string = control.value;
            let campos: string [] = fechaUsuario.split("/");
            const fechaHoy = new Date();
            const fecha = new Date(Number(campos[2]), Number(campos[1])-1, Number(campos[0]));
            if(!isNaN(fecha.getTime()) && Number(campos[0]) == fecha.getDate() && Number(campos[1]) == fecha.getMonth() + 1 && Number(campos[2]) == fecha.getFullYear() && fecha.getTime() > fechaHoy.getTime()) {
                return null;
            } else {
                return {fecha: true}
            }
        } else {
            return null;
        }
}
}