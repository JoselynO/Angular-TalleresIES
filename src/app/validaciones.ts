import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Validaciones {
    static validarFecha(control: AbstractControl) : ValidationErrors | null{
        if(control.value){
            const fechaUsuario : string = control.value;
            const fecha = new Date();
            const campos = fechaUsuario.split("/");
            fecha.setDate(Number(campos[0]));
            fecha.setMonth(Number(campos[1])-1);
            fecha.setFullYear(Number(campos[2]));
            console.log(fecha);
            if(!isNaN(fecha.getTime()) && Number(campos[0]) == fecha.getDate() && Number(campos[1]) == fecha.getMonth() + 1 && Number(campos[2]) == fecha.getFullYear()){
                return null;
            }else{
                return {validarFecha: true};
            }
        } else{
            return null;
        }
    }
}