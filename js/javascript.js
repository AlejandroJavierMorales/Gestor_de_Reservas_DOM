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
let validacion=[0,0];
let porcentaje_reserva=0.5;//Define con cuanto dinero se toma una Reserva respecto del Valor Total de la misma
//Variables del DOM
const txtNombre=document.getElementById("nombre");
const txtDni=document.getElementById("dni");
const txtPasajeros=document.getElementById("pasajeros");
const txtEmail=document.getElementById("email");
const txtDomicilio=document.getElementById("domicilio");
const txtFechaIn=document.getElementById("fechaIn");
const txtFechaOut=document.getElementById("fechaOut");
const p_reserva_nro=document.querySelector(".reserva_nro");
//Etiquetas de Reserva Confirmada
//Datos del Cliente (nombre, dni, domicilio, email, pasajeros)
const titular_reserva=document.querySelector(".titular_reserva")

//Datos de la Reserva
const div_reserva_confirmada=document.querySelector(".reserva_confirmada");
const p_fecha_ingreso=document.querySelector(".fecha_ingreso");
const p_fecha_egreso=document.querySelector(".fecha_egreso");
const p_cantidad_noches=document.querySelector(".cantidad_noches");
const p_cant_pasajeros=document.querySelector(".cant_pasajeros");
const p_costo_por_noche=document.querySelector(".costo_por_noche");
const p_total_estadia=document.querySelector(".total_estadia");
const p_costo_reserva=document.querySelector(".monto_reserva");

//Clases
class Reserva{
    constructor(nro,dni,huesped,fechaIngreso,fechaEgreso,cantPasajeros,costoPorNoche){
        this.nro=nro;
        this.dni=dni;
        this.nombre=huesped;
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
//Objeto Usuarios
const usuario={
        administrador:"admin",
        invitado:"1234"
}
//Array de Reservas
const arrayReservas=[];
//Array de Clientes
const arrayClientes=[];









//********************FUNCIONES ***************************/
const validarFormulario=()=>{
        validacion[0]=0;
        fechaIn= new Date(txtFechaIn.value);
        fechaOut= new Date(txtFechaOut.value);
        //alert("la conche de tu adre");
        //alert("dni "+ txtDni.value);
        //alert("nombre "+ txtNombre.value);
        //alert("Email "+txtEmail.value);
        //alert("Domicilio "+txtDomicilio.value);
        //alert("Pasajeros "+txtPasajeros.value);

        //alert("Logitud DNI "+(txtDni.value).length)
        if((txtDni.value).length !== 8){
                //alert("Entro "+txtDni.value);
                validacion[0]=0;
                validacion[1]=1;
        }else if(txtNombre.value =="" || ((txtNombre.value).trim().length)==0 ){
                //alert("Entro "+txtNombre.value);
                validacion[0]=0;
                validacion[1]=2;
        } else if(( txtEmail.value==""|| !(txtEmail.value).includes("@") || !(txtEmail.value).includes("."))){
                //alert("Entro "+txtEmail.value);
                validacion[0]=0;
                validacion[1]=4;
        }else if(txtDomicilio.value =="" || ((txtDomicilio.value).trim().length)==0){
                //alert("Entro "+txtDomicilio.value);
                validacion[0]=0;
                validacion[1]=5;
        }else if(parseInt(txtPasajeros.value) == 0 || txtPasajeros.value =="" || /\D/.test(txtPasajeros.value) || parseInt(txtPasajeros.value)>5){
                //alert("Entro "+txtPasajeros.value);
                validacion[0]=0;
                validacion[1]=3;
        }else if(fechaOut<=fechaIn){
                validacion[0]=0;
                validacion[1]=6
                //alert(" Entro Fecha In Formulario: "+fechaIn);
                //alert("Fecha In Formulario: "+fechaOut);
                //alert("Dias de Estadia: "+((fechaOut)-(fechaIn))/1000/60/60/24);
                
        }else{
                validacion[0]=1;
                validacion[1]=0;
        }
        //if(!(fechaOk=validarFechas())){//Valida y Pone en fechaIn y FechaOut los valores correctos (Variabes Globales)
        //        return validacion[0,6];
        //}
        //alert("Fecha In Formulario: "+fechaIn);
        //alert("Fecha In Formulario: "+fechaOut);
        //alert("Dias de EStadia: "+((fechaOut)-(fechaIn))/1000/60/60/24);

            totHuespedes+=parseInt(parseInt(txtPasajeros.value)); //totalizador de huespedes 

            cantReservas++; //totalizador de Reservas vendidas
                
            costo=precioEstadia[parseInt(txtPasajeros.value)];
        //Objeto cliente instancia a clase Cliente
        let cliente = new Cliente(txtDni.value,txtNombre.value,txtEmail.value,txtDomicilio.value);
        //Objeto reservaGral instancia la clase Reserva
        let reservaGral = new Reserva(cantReservas,txtDni.value,txtNombre.value,fechaIn,fechaOut,txtPasajeros.value,costo);

            
            //reservaGral.calcularNochesDeEstadia();//Ejecuto Metodo para saber de cuantas noches es la reserva
            //************cliente.informeDeCliente();
            //Cargar Reserva en Array de Reservas
            arrayReservas.push(reservaGral);
            //Cargar Cliente en Array de Clientes
            arrayClientes.push(cliente);
            //alert("Cliente"+ arrayClientes[0].dni+" "+arrayClientes[0].nombre)
       
}


//*************************************************************************/
//************* PROCESO DE CARGA DE RESERVA *******************************/
//Tratamiento de Ventana Modal para la Carga de Datos del Cliente y Reserva
const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{ //****Aciva Evento Click del boton de cierrede ventana modal */
        e.preventDefault();
        validarFormulario();//Validar Formulario
        //validacion[] es un array global
        if( parseInt(validacion[0])==1){
        //**** Si la carga de datos no tiene errores, guardado datos del Cliente y Reserva en Arrays correspondientes
        //y luego cerrar la ventana Modal
            
            alert("La Reserva se ha registrado con Exito, muchas gracias!");
            modal.classList.remove('modal--show');//Elimina la clase modal--show para cerrar la ventana
            //Traer datos de la última Reserva confirmada
                        //Datos del Cleinte
                        let objClienteAux= new Cliente (arrayClientes[(arrayClientes.length)-1].dni,arrayClientes[(arrayClientes.length)-1].nombre,arrayClientes[(arrayClientes.length)-1].email,arrayClientes[(arrayClientes.length)-1].domicilio);
                        //***Detalle del Cliente por Consola */
                        objClienteAux.informeDeCliente();
                        //Datos de la Reserva
                        let objReservaAux= new Reserva(arrayReservas[arrayReservas.length-1].nro,arrayReservas[arrayReservas.length-1].dni,arrayReservas[arrayReservas.length-1].nombre,arrayReservas[arrayReservas.length-1].fechaIngreso,arrayReservas[arrayReservas.length-1].fechaEgreso,arrayReservas[arrayReservas.length-1].cantPasajeros,arrayReservas[arrayReservas.length-1].costoPorNoche)
                        objReservaAux.calcularNochesDeEstadia();
                //Accediendo al DOM para presentar datos en pantalla
                div_reserva_confirmada.classList.remove("ocultar");
                p_reserva_nro.innerHTML=`<b>Reserva Nro. </b> ${objReservaAux.nro}`;
                //p_reserva_nro.style="color:red;background-color:blue;"
                        titular_reserva.innerHTML=`<b>Titular de la Reserva: </b> ${objReservaAux.nombre}<br>DNI: ${objReservaAux.dni} `;
                p_fecha_ingreso.innerHTML=`<b>Fecha de Ingreso: </b> ${objReservaAux.fechaIngreso}`;
                p_fecha_egreso.innerHTML=`<b>Fecha de Egreso: </b> ${objReservaAux.fechaEgreso}`;
                p_cantidad_noches.innerHTML=`<b>Noches de Alojamiento: </b> ${objReservaAux.estadia}`;
                p_cant_pasajeros.innerHTML=`<b>Pasajeros: </b> ${objReservaAux.cantPasajeros}`;
                p_costo_por_noche.innerHTML=`<b>Valor por Noche: </b> $${objReservaAux.costoPorNoche}`;
                p_total_estadia.innerHTML=`<b>Valor Total de la Reserva: </b> $${(objReservaAux.costoPorNoche)*(objReservaAux.estadia)}`;
                p_costo_reserva.innerHTML=`<b>Valor de Seña: </b> $${parseFloat(objReservaAux.costoPorNoche)*parseInt(objReservaAux.estadia)*porcentaje_reserva}`;

                div_reserva_confirmada.classList.add("estilo_reserva");
            
            
        }else{
            //si tiene errores traer codigo de error de ingreso de datos
            switch(validacion[1]){
                case 1: //Error de Nombre
                        alert("Error en el Nombre Ingresado");
                        break;
                case 2: //error de dni
                        alert("Error en el DNI Ingresado");
                        break;
                case 3: //error de pasajeros
                        alert("Error: La cantidad de pasajeros es Incorrecta");
                        break;
                case 4: //error de email
                        alert("Error: El Email ingresado es incorrecto");
                        break;
                case 5: //error de Domicilio
                        alert("Error: El Domicilio ingresado es incorrecto");
                        break;
                case 6: //error de fecha
                        alert("Error: La Fecha o el Periodo ingresado es incorrecto");
                        break;
                default:
                        alert("Error en Datos Ingresados...!");
                        break;
                }
            }
});

