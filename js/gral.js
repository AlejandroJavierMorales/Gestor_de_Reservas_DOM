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
   
   
 
function leerHabitaciones(){
     fetch('../habitaciones.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(valor => {
            arrayDeHabitaciones.push(valor)
        });
        
    });
    return arrayDeHabitaciones;    
}

arrayDeHabitaciones= leerHabitaciones();




const enviarEmail=()=>{

   /*  var templateParams = {
        name: 'James',
        notes: 'Check this out!',
        reply_to: 'malejandro2002@yahoo.com.ar',
        message: 'Hola esto es una prueba desde email-jS Nueva',
        to_name: 'James'
    };
     
    emailjs.send('service_b6r6z5e', 'template_x357qkg', templateParams,'kQEngu40eUN502B3w' )
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           console.log(response);
           alert("enviado");
        }, function(error) {
           console.log('FAILED...', error);
        }); */

let data={
            service_id: 'service_b6r6z5e',
            template_id: 'template_x357qkg',
            user_id: 'kQEngu40eUN502B3w',
            template_params: {
                to_name: 'James',
                reply_to: 'malejandro2002@yahoo.com.ar',
                message: 'Hola esto es una prueba desde email-jS rrrrrrrrrrr'
            }
}

    fetch('https://api.emailjs.com/api/v1.0/email/send',{
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
    })
    .then(function() {
        alert('Your mail is sent!');
    })
    .catch(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    }); 
    
   /* ;
    const res = respuesta.json();
    console.log(res); */


}

document.getElementById('send_email').addEventListener('click',(e)=>{
    e.preventDefault()   
    enviarEmail()
});




            /*/ code fragment
        var data = {
            service_id: 'YOUR_SERVICE_ID',
            template_id: 'YOUR_TEMPLATE_ID',
            user_id: 'YOUR_PUBLIC_KEY',
            template_params: {
                'username': 'James',
                'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
            }
        };
        
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function() {
            alert('Your mail is sent!');
        }).fail(function(error) {
            alert('Oops... ' + JSON.stringify(error));
        });
        // code fragment */

