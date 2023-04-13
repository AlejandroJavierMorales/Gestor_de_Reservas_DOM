//Variables de Js que definen el perfil de color del proyecto (paleta de colores)
let rootElement = document.documentElement;
let colorCuerpo = "#c7b69f";
let colorFuenteCuerpo="#69503c";
let colorPie="#ab9680";
let colorComponente="#c9beb0";
let colorComponenteInvertido="rgb(65, 62, 62)";
let colorFuenteInvertido="rgb(250, 241, 241)";

rootElement.style.setProperty("--colorCuerpo",colorCuerpo);
rootElement.style.setProperty("--colorFuenteCuerpo",colorFuenteCuerpo);
rootElement.style.setProperty("--colorPie",colorPie);
rootElement.style.setProperty("--colorComponente",colorComponente);
rootElement.style.setProperty("--colorComponenteInvertido",colorComponenteInvertido);
rootElement.style.setProperty("--colorFuenteInvertido",colorFuenteInvertido );


//Variables Globales
let huespedes =0;
let promHuespedes=0;
let promEstadia=0;
let=promFacturado=0
let totHuespedes=0;
let cantReservas=0;
let costo=0;
let fechaIn="00/00/0000";
let fechaOut="00/00/0000";
let estadia;
let validacion=[0,0];
let porcentaje_reserva=0.5;//Define con cuanto dinero se toma una Reserva respecto del Valor Total de la misma

let arrayHabitacionesSeleccionadas=[];
let arrayReservas=[];
let arrayClientes=[];


class Reserva{
    constructor(nro,dni,huesped,fechaIngreso,fechaEgreso,estadia,cantPasajerosAdultos,cantPasajerosMenores,costoPorNoche,habitacion,edadMenores){
        this.nro=nro;
        this.dni=dni;
        this.nombre=huesped;
        this.fechaIngreso=fechaIngreso;
        this.fechaEgreso=fechaEgreso;
        this.estadia=estadia;
        this.cantPasajerosAdultos=cantPasajerosAdultos;
        this.cantPasajerosMenores=cantPasajerosMenores;
        this.costoPorNoche=costoPorNoche;
        this.habitacion=habitacion;
        this.edadMenores=edadMenores;

    }
}
class Cliente{
    constructor(dni,nombre,email,telefono){
        this.dni=dni;
        this.nombre=nombre;
        this.email=email;
        this.telefono=telefono;
    }
}

const txtNombre=document.getElementById("nombre");
const txtDni=document.getElementById("dni");
const txtTelefono=document.getElementById("telefono");
const txtEmail=document.getElementById("email");

const div_reserva_confirmada=document.querySelector(".reserva_confirmada");

const formulario_modal = document.querySelector('.modal');
const btn_confirmar_reserva = document.querySelector('.btn_confirmar_reserva');
const btn_cancelar_reserva = document.querySelector('.btn_cancelar_reserva');

let reservaEnCurso ={
    habitacion:"",
    fechaIngreso:"",
    fechaEgreso:"",
    pasajerosAdultos:"",
    pasajerosMenores:"",
    edadMenores:""
};


let arrayDeHabitaciones=[];
let bdHabitaciones=[];
   
   
 
function leerHabitaciones(){
    
     fetch('../habitaciones.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(valor => {
            arrayDeHabitaciones.push(valor);
            
        });
        
    });  
}

leerHabitaciones();


