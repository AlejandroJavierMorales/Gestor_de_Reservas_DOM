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
}

const precioEstadia={
    1:14500,
    2:16500,
    3:18500,
    4:22000,
    5:25500
}

const usuario={
        administrador:"admin",
        invitado:"1234"
}

let arrayReservas=[];
let arrayClientes=[];





//********************Validacion Formulario de Carga de Reserva***************************/
const validarFormulario=()=>{
        validacion[0]=1;
        fechaIn= new Date(txtFechaIn.value);
        fechaOut= new Date(txtFechaOut.value);
        

       //Array Validacion contiene en la posicion 0 un bit en "0" si hubo error y "1" si no lo hubo
       // y en la posicion 1 el nro corresponde al tipo de Erorr
      
       if((txtNombre.value =="") || ((txtNombre.value).trim().length)==0 ){
                validacion[0]=0;
                validacion[1]=1;
        }else if(txtDni.value.length !== 8){
                validacion[0]=0;
                validacion[1]=2;
        }else if(txtDomicilio.value =="" || ((txtDomicilio.value).trim().length)==0){
                validacion[0]=0;
                validacion[1]=5;
        }else if(parseInt(txtPasajeros.value) == 0 || txtPasajeros.value =="" || /\D/.test(txtPasajeros.value) || parseInt(txtPasajeros.value)>5){
                validacion[0]=0;
                validacion[1]=3;
        }else if(( txtEmail.value==""|| !(txtEmail.value).includes("@") || !(txtEmail.value).includes("."))){
                validacion[0]=0;
                validacion[1]=4;
        }else if(fechaOut<=fechaIn){
                validacion[0]=0;
                validacion[1]=6;
        }else if(arrayClientes.length>0){//Si tengo Clientes ya registrados Verifico si el actual existe o no
                let clienteAux = arrayClientes.filter(function(cliente) {
                        return cliente.dni === txtDni.value;
                });
                
                if(clienteAux.length===0){
                        validacion[0]=1; //Si no existe, No hay error
                        validacion[1]=10;//10= Hacer Push del Cliente Nuevo
                }else if(clienteAux[0].nombre!==txtNombre.value){
                        validacion[0]=0; //Si existe el dni pero NO coicide el Nombre => Error!
                        validacion[1]=12;//12=Erorr de Cliente Incorrecto
                }else{
                        validacion[0]=1; //Si existe y el nombre Coincide
                        validacion[1]=11;//11= Todo Ok Sin Hacer Push del Cliente
                }
        }else{
                validacion[0]=1; //Si no registro anterior de clientes, No hay error
                validacion[1]=10;//10= Hacer Push del Cliente Nuevo
        }

        
        
}


//*************************************************************************/
//************* PROCESO DE CARGA DE RESERVA *******************************/
//Tratamiento de Ventana Modal para la Carga de Datos del Cliente y Reserva
const openModalReserva = document.querySelector('.btn_reservar');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.btn_confirmar_reserva');
const btn_cancelar_reserva = document.querySelector('.btn_cancelar_reserva');


openModalReserva.addEventListener('click', (e)=>{
    e.preventDefault();
    
    modal.classList.add('modal--show');
        //Si existen registros en el LocalStorage de Cliente y Reservas los recupera y los
        //guarda en lo arrays correspondientes
        if(JSON.parse(localStorage.getItem('clientes'))!== null){              
                arrayClientes = JSON.parse(localStorage.getItem('clientes'));
        }
        if(JSON.parse(localStorage.getItem('reservas')) !== null){
                arrayReservas=JSON.parse(localStorage.getItem('reservas'));   
                cantReservas=parseInt(arrayReservas[arrayReservas.length-1].nro); //Actualiza el nro de la ultima reserva registrada
        }
});

btn_cancelar_reserva.addEventListener('click',(e)=>{
        e.preventDefault();
        modal.classList.remove('modal--show')
});
closeModal.addEventListener('click', (e)=>{ //****Activa Evento Click del boton de cierrede ventana modal */
        e.preventDefault();
        validarFormulario();
        //validacion[] es un array global
        if( parseInt(validacion[0])==1){
                //**** Si la carga de datos no tiene errores, guardado datos del Cliente y Reserva en Arrays correspondientes
                //y luego cerrar la ventana Modal
                totHuespedes+=parseInt(parseInt(txtPasajeros.value)); //totalizador de huespedes 

                cantReservas++; //totalizador de Reservas vendidas
                
                costo=precioEstadia[parseInt(txtPasajeros.value)];//array que gusrda el precio segun cantidad de pasajeros (hasta 5 pasajeros)
  
                let cliente = new Cliente(txtDni.value,txtNombre.value,txtEmail.value,txtDomicilio.value);
   
                let reservaGral = new Reserva(cantReservas,txtDni.value,txtNombre.value,fechaIn,fechaOut,txtPasajeros.value,costo);
                reservaGral.calcularNochesDeEstadia(); //establece la propiedad estadia de la Reserva
                if(validacion[1]===10){
                        arrayClientes.push(cliente);
                }
                arrayReservas.push(reservaGral);
                Swal.fire({
                        text: "La Reserva ha sido Registrada con Éxito!",
                        icon: "success",
                        showConfirmButton: false,
                        timer:3000
                      })
                      
                
                modal.classList.remove('modal--show');
                //Traer datos de la última Reserva confirmada
                        //Datos del Cleinte
                        let objClienteAux= new Cliente (arrayClientes[(arrayClientes.length)-1].dni,arrayClientes[(arrayClientes.length)-1].nombre,arrayClientes[(arrayClientes.length)-1].email,arrayClientes[(arrayClientes.length)-1].domicilio);
                        //Datos de la Reserva
                        let objReservaAux= new Reserva(arrayReservas[arrayReservas.length-1].nro,arrayReservas[arrayReservas.length-1].dni,arrayReservas[arrayReservas.length-1].nombre,arrayReservas[arrayReservas.length-1].fechaIngreso,arrayReservas[arrayReservas.length-1].fechaEgreso,arrayReservas[arrayReservas.length-1].cantPasajeros,arrayReservas[arrayReservas.length-1].costoPorNoche)
                        objReservaAux.calcularNochesDeEstadia();
                        let f1=new Date(objReservaAux.fechaIngreso);
                        let f2=new Date(objReservaAux.fechaEgreso);
                
                //Accediendo al DOM para presentar datos en pantalla
                div_reserva_confirmada.classList.remove("ocultar");
                p_reserva_nro.innerHTML=`<b>Reserva Nro. </b> ${objReservaAux.nro}`;
                titular_reserva.innerHTML=`<b>Titular de la Reserva: </b> ${objReservaAux.nombre}<br>DNI: ${objReservaAux.dni} `;
                p_fecha_ingreso.innerHTML=`<b>Fecha de Ingreso: </b> ${f1.getDate()}/${f1.getMonth()+1}/${f1.getFullYear()}`;
                p_fecha_egreso.innerHTML=`<b>Fecha de Egreso: </b> ${f2.getDate()}/${f2.getMonth()+1}/${f2.getFullYear()}`;
                p_cantidad_noches.innerHTML=`<b>Noches de Alojamiento: </b> ${objReservaAux.estadia}`;
                p_cant_pasajeros.innerHTML=`<b>Pasajeros: </b> ${objReservaAux.cantPasajeros}`;
                p_costo_por_noche.innerHTML=`<b>Valor por Noche: </b> $${objReservaAux.costoPorNoche}`;
                p_total_estadia.innerHTML=`<b>Valor Total de la Reserva: </b> $${(objReservaAux.costoPorNoche)*(objReservaAux.estadia)}`;
                p_costo_reserva.innerHTML=`<b>Valor de Seña: </b> $${parseFloat(objReservaAux.costoPorNoche)*parseInt(objReservaAux.estadia)*porcentaje_reserva}`;

                div_reserva_confirmada.classList.add("estilo_reserva");
                //Guarda en el LocalStorage
                localStorage.setItem('reservas', JSON.stringify(arrayReservas));
                localStorage.setItem('clientes', JSON.stringify(arrayClientes));
            
            
        }else{
            //identifica tipo de error
            switch(validacion[1]){
                case 1: //Error de Nombre
                        Swal.fire({
                               title: "Error",
                             text: "El Nombre Ingresado es Incorrecto",
                           icon: "warning",
                      
                        });
                        break;
                case 2: //error de dni
                        Swal.fire({
                                title: "Error",
                                text:"El número de DNI Ingresado es Incorrecto",
                                icon: "warning",
                                
                        });
                        break;
                case 3: //error de pasajeros
                        Swal.fire({
                                title: "Error",
                                text: "La cantidad de pasajeros es Incorrecta, debe ser >=1 o <=5",
                                icon: "warning",
                                
                        });
                        break;
                case 4: //error de email
                        Swal.fire({
                                title: "Error",
                                text:"El Email ingresado es incorrecto",
                                icon: "warning",
                                
                        });
                        break;
                case 5: //error de Domicilio
                        Swal.fire({
                                title: "Error",
                                text:"El Domicilio ingresado es incorrecto",
                                icon: "warning",
                                
                        });
                        break;
                case 6: //error de fecha
                        Swal.fire({
                                title: "Error",
                                text:"La Fecha o el Periodo ingresado es incorrecto",
                                icon: "warning",
                                
                        });
                        break;
                case 12://Error de Cliente Incorrecto (Coincide el DNI pero no el Nombre)
                        Swal.fire({
                                title: "Error",
                                text: "El Cliente es Incorrecto, el Nombre No Coincide con el Registrado...",
                                icon: "warning",
                                
                        });
                        break;
                default:
                        Swal.fire({
                                title: "Error",
                                text: "Los Datos Ingresados son Incorrectos o están Incompletos...",
                                icon: "warning",
                                
                        });
                        break;
                }
            }
});





