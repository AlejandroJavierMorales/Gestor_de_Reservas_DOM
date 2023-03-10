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





//*************** Inicio Simulador de Reservas Con OBJETOS - ARRAYS - FUNCIONES DE ORDEN SUPERIOR *****************
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

//Clases
class Reserva{
    constructor(nro,huesped,fechaIngreso,fechaEgreso,cantPasajeros,costoPorNoche,dni){
        this.nro=nro;
        this.dni=dni;
        this.huesped=huesped;
        this.fechaIngreso=fechaIngreso;
        this.fechaEgreso=fechaEgreso;
        this.cantPasajeros=cantPasajeros;
        this.costoPorNoche=costoPorNoche;    
    }

    calcularNochesDeEstadia(){
        this.estadia=(this.fechaEgreso-this.fechaIngreso)/1000/60/60/24;
    }
}
class Cliente{
    constructor(dni,nombre,email,domicilio){
        this.dni=dni;
        this.nombre=nombre;
        this.email=email;
        this.domicilio=domicilio;
    }
    informeDeCliente(){
        console.log("--------------------------------------");
        //console.log(`-------- INFORME DE CLIENTE ----------`);
        console.log(`Nombre: ${this.nombre}  DNI: ${this.dni}`);
        console.log(`Email: ${this.email}`);
        console.log(`Domicilio: ${this.domicilio}`);
        console.log("--------------------------------------");
        
    }

}

//Objeto que guarda la lista de precios segun la cantidad de pasajeros
const precioEstadia={
    1:14500,
    2:16500,
    3:18500,
    4:22000,
    5:25500
}
//Array de Reservas
const arrayReservas=[];
//Array de Clientes
const arrayClientes=[];

//FUNCIONES ***********************************


//Funcion que solicita el ingreso de Fecha de Ingreso y Egreso
const ingresarFecha=(queFecha)=>{
    let fecha1;
    let fechaSplited;
    let mes,dia,anio;
    if(queFecha==="fechaIn"){
        fecha1=prompt("Ingrese la Fecha de Ingreso al Alojamiento");
        fechaSplited=fecha1.split("/");
        dia=fechaSplited[0];
        mes=fechaSplited[1];
        anio=fechaSplited[2];
        fechaIn= new Date(+fechaSplited[2],fechaSplited[1]-1, +fechaSplited[0]);
    }else if(queFecha==="fechaOut"){
        fecha1=prompt("Ingrese la Fecha de Egreso del Alojamiento");
        fechaSplited=fecha1.split("/");
        dia=fechaSplited[0];
        mes=fechaSplited[1];
        anio=fechaSplited[2];
        fechaOut= new Date(+fechaSplited[2],fechaSplited[1]-1, +fechaSplited[0]);
    }
    fechaOk=validarFecha(dia,mes,anio);
}
 //Funcion de VALIDACION DE FECHAS
 const validarFecha= (dia,mes,anio) => {
        let diaF=parseInt(dia);
        let mesF=parseInt(mes);
        let anioF=parseInt(anio);

        if(mesF<1 || mesF>12){
            alert("El Mes Ingresado es Incorrecto");
            return false;
        }

        if(mesF==2){
            if (diaF>28 || diaF<=0){
                alert("El Día Ingresado es Incorrecto")
                return false;
            }
        }else if(mesF==1||mesF==3||mesF==5||mesF==7||mesF==8||mesF==10||mesF==12){
            if (diaF>31 || diaF<=0){
                alert("El Día Ingresado es Incorrecto")
                return false;
            }
        }else if(mesF==4||mesF==6||mesF==9||mesF==11){
            if (diaF>30 || diaF<=0){
                alert("El Día Ingresado es Incorrecto")
                return false;
        }
    }
}
//Funcion de Ingreso del DNI DEL TITULAR DE LA RESERVA o Finalizar Carga de Datos
const ingresarDni=()=>{
    let dniCliente="";
    dniCliente=prompt("Ingrese DNI del Titular de la Reserva")
    while((/\D/.test(dniCliente) && dniCliente !="F")||(dniCliente.length!=8 && dniCliente !="F" )){
         dniCliente=prompt("Ingrese el DNI del Titular de la Reserva");
     }
     return dniCliente;
 }
//Funcion de Ingreso del NOMBRE DEL TITULAR DE LA RESERVA o Finalizar Carga de Datos
const ingresarNombre=()=>{
   nombre=prompt("Ingrese el Nombre del Titular de la Reserva")
    while(nombre =="" || (nombre.trim().length)==0 ){
        nombre=prompt("Ingrese el Nombre del Titular de la Reserva")
    }
    return nombre;
}
const ingresarEmail=()=>{
    let email=prompt("Ingrese Email de contacto")
    while( email==""|| !email.includes("@" || !email.includes("."))){
        email=prompt("Ingrese Email de contacto")
    }
    return email;
}
const ingresarDomicilio=()=>{
    domicilio=prompt("Ingrese Domicilio")
    while(domicilio =="" || (domicilio.trim().length)==0 ){
        domicilio=prompt("Ingrese Domicilio")
    }
    return domicilio;
}

//Funcion de Calculos Finales
const calcularTotales= ()=>{
    const arrayPromedios=[];
    let facturac=0;
    let pasaj=0;
    let maxHuesp=0;
    let minHuesp=100;
    let  estad=0;
    let maxEstad=0;
    for (const reserva of arrayReservas){
        
        facturac += (parseInt(reserva.costoPorNoche)*(parseInt(reserva.estadia)));
        pasaj += parseInt(reserva.cantPasajeros);
        estad += parseInt(reserva.estadia);
        if (reserva.estadia>maxEstad){
            maxEstad=parseInt(reserva.estadia); //actualiza la reserva mas larga, si la acual en mayor que la almacenada
        }
        if (reserva.cantPasajeros<minHuesp){ //verifica si la cantidad de huespedes en menor a la almacenada
            minHuesp=parseInt(reserva.cantPasajeros);
        }
        if (reserva.cantPasajeros>maxHuesp){//verifica si la cantidad de huespedes en mayor a la ingresada
            maxHuesp=parseInt(reserva.cantPasajeros);
        }
    }

    promHuespedes = pasaj/arrayReservas.length;
    promEstadia=estad/arrayReservas.length;
    promFacturado=facturac/estad;

    arrayPromedios.push(promHuespedes);//0 Promedio de pasajeros por Reserva
    arrayPromedios.push(promEstadia);//1 cantidad de noches promedio por Reserva
    arrayPromedios.push(promFacturado);//2 Promedio facturado por Noche de Alojamiento
    arrayPromedios.push(facturac);//3 TotalFacturado
    arrayPromedios.push(maxEstad);//4 Estadia Mas larga
    arrayPromedios.push(minHuesp);//5 Estadia con Menor cantidad de pasajeros
    arrayPromedios.push(maxHuesp);//6 Estadia con Mayor cantidad de pasajeros
    arrayPromedios.push(estad);//7 Total de Noches Vendidas
    return arrayPromedios;
    
}

//Función que Imprime por Consola Detalle de Cada Reserva
const imprimirReserva = ()=>{
    for(const arrayReserva of arrayReservas){
        console.log(`******  RESERVA Nro${arrayReserva.nro} ******`);
        console.log(`A nombre de: ${arrayReserva.huesped} DNI: ${arrayReserva.dni}`);
        console.log(`Cantidad de Huéspedes ${arrayReserva.cantPasajeros}`);
        console.log(`Fecha de Ingreso: ${arrayReserva.fechaIngreso}`);
        console.log(`Fecha de Egreso: ${arrayReserva.fechaEgreso}`);
        console.log(`Cantidad de Noches Contratadas: ${arrayReserva.estadia}`);
        console.log(`Valor por Noche: ${arrayReserva.costoPorNoche}`);       
        console.log(`Valor Total de la Reserva: $${parseInt(arrayReserva.estadia)*parseFloat(arrayReserva.costoPorNoche)}`);
        console.log(`---------------------------------------------`);
    }
}
//Función que imprime Resumen de Ventas de Reservas 
const imprimirTotalesReserva =()=>{
    let arrayDePromedios=[];
    arrayDePromedios=calcularTotales();

    console.log("");
    console.log("");
    console.log(`---------------------------------------------`);
    console.log(`----------RESUMEN DE VENTAS------------------`);
    console.log(`---------------------------------------------`);
    console.log("******  RESERVAS ******");
    console.log(`Se vendieron en Total: ${arrayReservas.length} Reservas`);
    console.log(`Se vendieron en Total: ${parseInt(arrayDePromedios[7])} Noches`);
    console.log(`La Estadía Promedio fue de ${parseFloat(arrayDePromedios[1]).toFixed(1)} Noches`);
    console.log(`La Estadía Más Larga fue de ${arrayDePromedios[4]} Noches`);
    console.log("******  FACTURACIÓN ******");
    console.log(`El Total Facturado es de $${parseFloat(arrayDePromedios[3]).toFixed(2)}`);
    console.log(`El Promedio Facturado por Noche de Alojamiento es de $${parseFloat(arrayDePromedios[2]).toFixed(2)}`);
    console.log("******  HUÉSPEDES ******");
    console.log(`La Cantidad Total de Huéspedes Alojados fue de ${totHuespedes}`);
    console.log(`Se Alojaron en Promedio ${parseFloat(arrayDePromedios[0]).toFixed(1)} Pasajeros por Reserva`); 
    console.log(`La Estadía con Más Pasajeros Alojados tuvo ${arrayDePromedios[6]} huéspedes`);
    console.log(`La Estadía con Menos Pasajeros Alojados tuvo ${arrayDePromedios[5]} huéspedes`);
}

//Funcion que Carga Reservas
const cargarReservas=()=>{
        let dniCli=ingresarDni();
        let nombreHuesped=ingresarNombre();
        let emailCli=ingresarEmail();
        let domicilioCli=ingresarDomicilio();
            //Ingreso Cantidad de huespedes a Alojarse
            do{
                huespedes=prompt("Ingrese la Cantidad de Huéspedes por favor (1 a 5 pasajeros):");
                
            }while(huespedes <=0 || /\D/.test(huespedes) || huespedes>5) //Hacer mientras la cantidad de huespedes sea un número y este entre 1 y 5 pasajeros
                
            totHuespedes+=parseInt(huespedes); //totalizador de huespedes

            //Ingreso de Fecha de checkIn
            do{
                ingresarFecha("fechaIn");
            }while(fechaOk==false)
            //Ingreso de Fecha de checkOut
            do{
                ingresarFecha("fechaOut")
                if(fechaOut<=fechaIn){
                    alert("La Fecha de Egreso debe ser Posterior a la de Ingreso")
                }
            }while((fechaOk==false)||(fechaOut<=fechaIn))

            cantReservas++; //totalizador de Reservas vendidas
                
            costo=precioEstadia[huespedes];
            
            //Objeto cliente instancia a clase Cliente
            const cliente = new Cliente(dniCli,nombreHuesped,emailCli,domicilioCli);
            //Objeto reservaGral instancia la clase Reserva
            const reservaGral = new Reserva(cantReservas,nombreHuesped,fechaIn,fechaOut,huespedes,costo,dniCli);
            
            reservaGral.calcularNochesDeEstadia();//Ejecuto Metodo para saber de cuantas noches es la reserva
            
            //Cargar Reserva en Array de Reservas
            arrayReservas.push(reservaGral);
            //Cargar Cliente en Array de Clientes
            arrayClientes.push(cliente);
  
}

const listarClientes=()=>{
    for (const cliente of arrayClientes){
        cliente.informeDeCliente();
    }
}

//**************** INICIO SIMULADOR GESTOR DE RESERVAS DE ALOJAMIENTO *****************/
let opcionElegida=prompt("**** MENU PRINCIPAL ****\n 1- Cargar Reserva\n 2- Listar Clientes\n 3- Detalle de Reservas\n 4- Totales de Faturación\n 5- Imprimir Todo por Consola\n 6- Salir")

while((opcionElegida>=1 && opcionElegida<=5)|| opcionElegida!=6){
        
        if(opcionElegida==1){
                //Cargar Reservas
                cargarReservas();
        }else if(opcionElegida==2){
                //Listar Clientes
                console.clear();
                console.log("********** INFORME DE CLIENTES ***********")
                listarClientes();
        }else if(opcionElegida==3){
                //Mostrar Detalle de Reservas
                console.clear();
                imprimirReserva();
        }else if(opcionElegida==4){
                //Mostrar Totales de Facturacion
                console.clear();
                imprimirTotalesReserva();
        }else{
            //Mostrar Todo por Consola
            console.clear();
            console.log("********** INFORME DE CLIENTES ***********")
            listarClientes();
            imprimirReserva();
            imprimirTotalesReserva();
        }
        opcionElegida=prompt("**** MENU PRINCIPAL ****\n 1- Cargar Reserva\n 2- Listar Clientes\n 3- Detalle de Reservas\n 4- Totales de Faturación\n 5- Imprimir Todo por Consola\n 6- Salir")
    }
//**************************** Fin del Programa ***************************************/
