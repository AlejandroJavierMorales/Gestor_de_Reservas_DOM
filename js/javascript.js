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
let arrayReservas=[];
//Array de Clientes
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
                        validacion[1]=12;//11=Erorr de Cliente Incorrecto
                }else{
                        validacion[0]=1; //Si existe y el nombre Coincide
                        validacion[1]=11;//12= Todo Ok Sin Hacer Push del Cliente
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
                //Objeto cliente instancia a clase Cliente
                let cliente = new Cliente(txtDni.value,txtNombre.value,txtEmail.value,txtDomicilio.value);
                //Objeto reservaGral instancia la clase Reserva
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
                      
                
                modal.classList.remove('modal--show');//Elimina la clase modal--show para cerrar la ventana
                //Traer datos de la última Reserva confirmada
                        //Datos del Cleinte
                        let objClienteAux= new Cliente (arrayClientes[(arrayClientes.length)-1].dni,arrayClientes[(arrayClientes.length)-1].nombre,arrayClientes[(arrayClientes.length)-1].email,arrayClientes[(arrayClientes.length)-1].domicilio);
                        //***Detalle del Cliente por Consola */
                        objClienteAux.informeDeCliente();
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
            //si tiene errores traer codigo de error de ingreso de datos
            switch(validacion[1]){
                case 1: //Error de Nombre
                        Swal.fire({
                               title: "Error",
                             text: "El Nombre Ingresado es Incorrecto",
                           icon: "warning",
                           className:"ventana_alerta",
                        });
                        break;
                case 2: //error de dni
                        Swal.fire({
                                title: "Error",
                                text:"El número de DNI Ingresado es Incorrecto",
                                icon: "warning",
                                className:"ventana_alerta",
                        });
                        break;
                case 3: //error de pasajeros
                        Swal.fire({
                                title: "Error",
                                text: "La cantidad de pasajeros es Incorrecta, debe ser >=1 o <=5",
                                icon: "warning",
                                className:"ventana_alerta",
                        });
                        break;
                case 4: //error de email
                        Swal.fire({
                                title: "Error",
                                text:"El Email ingresado es incorrecto",
                                icon: "warning",
                                className:"ventana_alerta",
                        });
                        break;
                case 5: //error de Domicilio
                        Swal.fire({
                                title: "Error",
                                text:"El Domicilio ingresado es incorrecto",
                                icon: "warning",
                                className:"ventana_alerta",
                        });
                        break;
                case 6: //error de fecha
                        Swal.fire({
                                title: "Error",
                                text:"La Fecha o el Periodo ingresado es incorrecto",
                                icon: "warning",
                                className:"ventana_alerta",
                        });
                        break;
                case 12://Error de Cliente Incorrecto (Coincide el DNI pero no el Nombre)
                        Swal.fire({
                                title: "Error",
                                text: "El Cliente es Incorrecto, el Nombre No Coincide con el Registrado...",
                                icon: "warning",
                                className:"ventana_alerta",
                        });
                        break;
                default:
                        Swal.fire({
                                title: "Error",
                                text: "Los Datos Ingresados son Incorrectos o están Incompletos...",
                                icon: "warning",
                                className:"ventana_alerta",
                        });
                        break;
                }
            }
});

//*************************************************************************/
//************* INGRESO A ADMINISTRACION MODAL USER/PASSWORD **************/

const openModalLogin = document.querySelector('.btn_admin');
const modalLogin = document.querySelector('.login_modal');
const btnLoginModal = document.querySelector('.btn_login');
const btnLogOutModal =document.querySelector('.btn_logout');
const txtUsuario = document.getElementById("txt_usuario");
const txtPassword = document.getElementById("txt_password");
let registroDeUsuariosAux=[];
let registroDeUsuarios=[];

const openVentanaAdmin=document.querySelector('.ventana_administracion');

class Usuario {
        constructor(usuario, password) {
          this.usuario = usuario;
          this.password = password;
        }
      }



openModalLogin.addEventListener('click', (e)=>{
    e.preventDefault();
    modalLogin.classList.add('modal--show');
    
});
//Verifica Autenticacion, si esta Ok accede a administracion y cierra Login
btnLoginModal.addEventListener('click',(e)=>{
        e.preventDefault();
        //Verificar Credenciales
        if (txtUsuario.value !== null && txtPassword !== null){
                
                const newUser = new Usuario(txtUsuario.value,txtPassword.value)
                registroDeUsuariosAux = JSON.parse(localStorage.getItem('usuariosGR'));
                if (registroDeUsuariosAux === null) { 
                        Swal.fire({
                                title: 'Usuario Inexistente',
                                text: "...Desea Registrarlo?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Registrar',
                                cancelButtonText: 'Cancelar'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                        registroDeUsuarios.push(newUser);
                                        localStorage.setItem('usuariosGR', JSON.stringify(registroDeUsuarios));
                                        txtUsuario.value="";
                                        txtPassword.value="";
                                        Swal.fire({
                                                text: "Por Favor Vuelva a Ingresar sus Credenciales para acceder al Sistema...",
                                                icon: "success",
                                                className:"ventana_alerta",
                                              });
                                }else{
                                        Swal.fire({
                                                title: "Usuario No Registrado",
                                                icon: "warning",
                                                className:"ventana_alerta",
                                              });
                                }
                              })       
                        
                }else{
                        //Trae los Usuarios Registrados
                        registroDeUsuarios = JSON.parse(localStorage.getItem('usuariosGR'));
                        //Busca en el array si el usuario actual ys existe, en caso que si, devuelve el objeto usuario encontrado
                        let usuario = registroDeUsuarios.filter(function(usuario) {
                                return usuario.usuario === txtUsuario.value;
                            });
                        
                        //Si NO encontro elusuario como existente
                        if (usuario.length==0){
                                Swal.fire({
                                        title: 'Usuario Inexistente',
                                        text: "...Desea Registrarlo?",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'Registrar',
                                        cancelButtonText: 'Cancelar'
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                                registroDeUsuarios.push(newUser);
                                                localStorage.setItem('usuariosGR', JSON.stringify(registroDeUsuarios));
                                                txtUsuario.value="";
                                                txtPassword.value="";
                                                Swal.fire({
                                                        text: "Por Favor Vuelva a Ingresar sus Credenciales para acceder al Sistema...",
                                                        icon: "success",
                                                        className:"ventana_alerta",
                                                      });
                                        }else{
                                                Swal.fire({
                                                        title: "Usuario No Registrado",
                                                        icon: "warning",
                                                        className:"ventana_alerta",
                                                      });
                                        }
                                      })  
                        }else if(usuario.length===1){ //Si el Usuario Ya Existia...
                                if(usuario[0].password===txtPassword.value ){// y el password es el correcto (el amacenado) le da la Bienvenida y permite el ingreso a Administracion
                                
                                
                                modalLogin.classList.remove("modal--show");
                                //***Mostrar Ventana de Administracion */
                                openVentanaAdmin.classList.add('modal--show');
                                openVentanaAdmin.classList.remove("ocultar");
                        }else {
                                Swal.fire({
                                        title:"Error",
                                        title: "El Password  Ingresado es Incorrecto...",
                                        icon: "warning",
                                        className:"ventana_alerta",
                                      });
                                }
                        
                        }    
                        
                }       
        }else{
                Swal.fire({
                        title:"Error",
                        title: "Usuario o Password  Ingresado es Incorrecto...",
                        icon: "warning",
                        className:"ventana_alerta",
                      });
        }
});
//Cancela Login y cierra ventana Modal
btnLogOutModal.addEventListener('click',(e)=>{
        e.preventDefault();
        modalLogin.classList.remove("modal--show")
});

//***********************************************************/
//*************** VENTANA DE ADMINISTRACION *****************/
const radioClientes=document.getElementById("listado_cliente");
const radioReservas=document.getElementById("listado_reserva");
const radioFacturacion=document.getElementById("listado_facturacion");
const contenedorSubPanel=document.querySelector('.contenedor_subPanel');
const contenedorBotones=document.querySelector('.contenedor_botones');



const subPanelClientes=()=>{
        contenedorSubPanel.innerHTML=`  <div class="col-4">
                                                <input class="" type="radio" name="cli" value="cli_todos" id="cli_todos" > <label for="cli_todos">Todos</label>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="cli" value="cli_dni" id="cli_dni"> <label for="cli_dni">x DNI</label>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="cli" value="cli_nombre"  id="cli_nombre"> <label for="cli_nombre">x Nombre</label>
                                        </div>
                                        <div class="contenedor_subpanel_clientes row d-flex justify-content-center ">
                                                
                                        </div>
                                        `;

}

const subPanelReservas=()=>{
        contenedorSubPanel.innerHTML=`  <div class="col-3">
                                                <input class="" type="radio" name="res" value="res_todos" id="res_todos" > <label>Todas</label>
                                        </div>
                                        <div class="col-3">
                                                <input class="" type="radio" name="res" value="res_periodo" id="res_periodo"> <label>Período</label>
                                        </div>
                                        <div class="col-3">
                                        <input class="" type="radio" name="res" value="res_fechaIn" id="res_FechaIn"> <label>Fecha de Ingreso</label>
                                        </div>
                                        <div class="col-3">
                                                <input class="" type="radio" name="res" value="res_cliente"  id="res_cliente"> <label>Cliente</label>
                                        </div>
                                        <div class="contenedor_subpanel_reservas row d-flex justify-content-center ">
                                                
                                        </div>
                                        `;
}
const subPanelFacturacion=()=>{
        contenedorSubPanel.innerHTML=`  <div class="col-4">
                                                <input class="" type="radio" name="res" value="fac_todos" id="fac_todos"  > <label>Facturación Total</label>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="res" value="fac_periodo" id="fac_periodo"> <label>Período</label>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="res" value="fac_cliente"  id="fac_cliente"> <label>Cliente</label>
                                        </div>
                                        <div class="contenedor_subpanel_facturacion row d-flex justify-content-center ">
                                                
                                        </div>
                                        `;
}

function clickClientesTodo(){
        const contenedorSubpanelClientes=document.querySelector('.contenedor_subpanel_clientes');  
        contenedorSubpanelClientes.innerHTML=``;
}
function clickClientesDni(){
        const contenedorSubpanelClientes=document.querySelector('.contenedor_subpanel_clientes');
        contenedorSubpanelClientes.innerHTML=`<div class="p-3 ">
                                                <select class="p-1" name="select" id="select" >
                                                        <option>DNI de Cliente </option>
                                                </select>
                                              </div>`;
        cargar_select('clientes');//carga dnis

}
function clickClientesNombre(){
        const contenedorSubpanelClientes=document.querySelector('.contenedor_subpanel_clientes');       
        contenedorSubpanelClientes.innerHTML=`<div class="p-3 ">
                                                <input class="p-1" type="text" name="buscar" id="txt_buscar_cli">
                                              </div>`
        const txtBuscarCli=document.getElementById("txt_buscar_cli");
        txtBuscarCli.placeholder="Buscar por Nombre del Cliente"
        txtBuscarCli.classList.add("estilo_txtBuscarCliNombre");
}
function clickReservasTodo(){
        const contenedorSubpanelReservas=document.querySelector('.contenedor_subpanel_reservas');
        contenedorSubpanelReservas.innerHTML=``;
}
function clickReservasPeriodo(){
        const contenedorSubpanelReservas=document.querySelector('.contenedor_subpanel_reservas');        
        contenedorSubpanelReservas.innerHTML=`<div class="p-2">
                                                        <label for="fechaIn">Fecha Inicial</label>
                                                        <input class="p-1 dtp_in" type="date" name="fechaIn" id="fechaIn">
                                              </div>
                                              <div class="p-2">
                                                        <label for="fechaOut">Fecha Final</label>
                                                        <input class="p-1  dtp_out" type="date" name="fechaOut" id="fechaOut">
                                              </div`;
}
function clickReservasFechaIn(){
        const contenedorSubpanelReservas=document.querySelector('.contenedor_subpanel_reservas');
        contenedorSubpanelReservas.innerHTML=`<div class="p-3">
                                                        <label for="fechaIn">Fecha De CheckIn</label>
                                                        <input class="p-1 dtp_in" type="date" name="fechaIn" id="fechaIn">
                                              </div>`;
}
function clickReservasCliente(){
        const contenedorSubpanelReservas=document.querySelector('.contenedor_subpanel_reservas');
        
        contenedorSubpanelReservas.innerHTML=`<div class="p-3">
                                                <select class="p-1" name="select" id="select" >
                                                        <option>DNI de Cliente </option>
                                                </select>
                                              </div>`;
        cargar_select('reservas');
}
function clickFacturacionTodo(){
        const contenedorSubpanelFacturacion=document.querySelector('.contenedor_subpanel_facturacion');
        
        contenedorSubpanelFacturacion.innerHTML=``;
}
function clickFacturacionPeriodo(){
        const contenedorSubpanelFacturacion=document.querySelector('.contenedor_subpanel_facturacion');
        
        contenedorSubpanelFacturacion.innerHTML=`<div class="p-2">
                                                        <label for="fechaIn">Desde</label>
                                                        <input class="p-1 dtp_in" type="date" name="fechaIn" id="fechaIn">
                                              </div>
                                              <div class="p-2">
                                                        <label for="fechaOut">Hasta</label>
                                                        <input class="p-1 dtp_out" type="date" name="fechaOut" id="fechaOut">
                                              </div>`;
}
function clickFacturacionCliente(){
        const contenedorSubpanelFacturacion=document.querySelector('.contenedor_subpanel_facturacion');
        
        contenedorSubpanelFacturacion.innerHTML=`<div class="p-2">
                                                        <select class="p-1" name="select" id="select">
                                                                <option>DNI de Cliente </option>
                                                        </select>
                                                 </div>`;
        cargar_select('clientes');
                                              
}

//**** funcion para Cargar DNI al campo <select> *****/
function cargar_select(objeto) {
       let contenido_a_cargar=objeto;
        let array=[];
        registroDeClientesAux = JSON.parse(localStorage.getItem(contenido_a_cargar));
        
        if (registroDeClientesAux !== null) {
                
                registroDeClientesAux.forEach(element => {  
                        let existe = array.some((elemento) => elemento == element.dni);//busca de No cargar DNIs duplicados
                        if(!existe){
                            array.push(element.dni);    
                        }
                });
                
                array.sort();
       
        addOptions("select", array);
        }
}      
// Funcion para agregar opciones a <select>
function addOptions(domElement, array) {
let select = document.getElementsByName(domElement)[0];
       
        for (value in array) {
        let option = document.createElement("option");
        option.text = array[value];
        select.add(option);
        }
}

//Pone en eccucha del evento clic a los radio buttons de clientes, reservas y facturacion en la cabacera
//de la ventana de administracion, los que dispararan luego los listados e mostrar en pantalla.
radioClientes.addEventListener('click',()=>{
        subPanelClientes();
        const radioCliTodos=document.getElementById("cli_todos");
        const radioCliDni=document.getElementById("cli_dni");
        const radioCliNombre=document.getElementById("cli_nombre");

        radioCliTodos.addEventListener('click',(e)=>{
                
                clickClientesTodo();
        });
        radioCliDni.addEventListener('click',(e)=>{
                
                clickClientesDni();
        });
        radioCliNombre.addEventListener('click',(e)=>{
                
                clickClientesNombre();
        });
        
});
radioReservas.addEventListener('click',()=>{
        subPanelReservas();
        const radioResTodos=document.getElementById("res_todos");
        const radioResPeriodo=document.getElementById("res_periodo");
        const radioResFechaIn=document.getElementById("res_FechaIn");
        const radioResCliente=document.getElementById("res_cliente");

        radioResTodos.addEventListener('click',()=>{
                clickReservasTodo();
        });
        radioResPeriodo.addEventListener('click',()=>{
                clickReservasPeriodo();
        });
        radioResFechaIn.addEventListener('click',()=>{
                clickReservasFechaIn();
        });
        radioResCliente.addEventListener('click',()=>{
                clickReservasCliente();
        });

})
radioFacturacion.addEventListener('click',()=>{
        subPanelFacturacion();
        const radioFacTodos=document.getElementById("fac_todos");
        const radioFacPeriodo=document.getElementById("fac_periodo");
        const radioFacCliente=document.getElementById("fac_cliente");
        
        radioFacTodos.addEventListener('click',()=>{
                clickFacturacionTodo();
        });
        radioFacPeriodo.addEventListener('click',()=>{
                clickFacturacionPeriodo();
        });
        radioFacCliente.addEventListener('click',()=>{
                clickFacturacionCliente();
        });
})

/********************* LISTADOS *******************/
/**************************************************/
const botonAceptar = document.querySelector(".btn_aceptar_listados");
const cuerpoListados = document.querySelector('.contenedor_resultados');

botonAceptar.addEventListener('click',()=>{
        const radioCliTodos=document.getElementById("cli_todos");
        const radioCliDni=document.getElementById("cli_dni");
        const radioCliNombre=document.getElementById("cli_nombre");
        const radioResTodos=document.getElementById("res_todos");
        const radioResPeriodo=document.getElementById("res_periodo");
        const radioResFechaIn=document.getElementById("res_FechaIn");
        const radioResCliente=document.getElementById("res_cliente");
        const radioFacTodos=document.getElementById("fac_todos");
        const radioFacPeriodo=document.getElementById("fac_periodo");
        const radioFacCliente=document.getElementById("fac_cliente"); 
        
        //* Listados de Clientes */
        if(radioClientes.checked===true){
                formato_listados();

                if(radioCliTodos.checked===true){
                        informeClientes("todos");
                }else if(radioCliDni.checked===true){
                        informeClientes("dni");
                }else if(radioCliNombre.checked===true){
                        informeClientes("nombre");
                }
        }  
        //* Listados de Reservas */
        if(radioReservas.checked===true){
                formato_listados();

                if(radioResTodos.checked===true){
                        informeReservas("todos");
                }else if(radioResPeriodo.checked===true){
                        informeReservas("periodo");
                }else if(radioResFechaIn.checked===true){
                        informeReservas("fechain");
                }else if(radioResCliente.checked===true){
                        informeReservas("cliente");
                }
        } 
        //* Listados de Facturación */
        if(radioFacturacion.checked===true){
                formato_listados();
                if(radioFacTodos.checked===true){
                        informeFacturacion("todos");
                }else if(radioFacPeriodo.checked===true){
                        informeFacturacion("periodo");
                }else if(radioFacCliente.checked===true){
                        informeFacturacion("cliente");
                }
        } 
});

//************* FUNCIONES DE LISTADOS *************/
const formato_listados=()=>{
 cuerpoListados.innerHTML=`
                                  <header class="cabecera_listado row col-12">
                                        <div class="header_logo_listado  col-4">
                                                <img class="img-fluid rounded" src="./assets/images/logo_hotel.jpg" id="logo_hotel_listado" alt="logo hotel">
                                        </div>
                                        <div class="text-center col-8 d-flex justify-content-center">
                                           <div class="row d-flex justify-content-center align-items-center col-12">
                                                <div class="col-9">
                                                        <h2  class="titulo_listado">Listado</h2>
                                                </div>
                                                <div class="col-3">
                                                        <h3 class="fecha">Fecha</h3>
                                                </div>
                                            </div>
                                        </div>
                                  </header>`
                                     
}

const informeClientes=(parametro)=>{
        let clientes=[];
        if(JSON.parse(localStorage.getItem('clientes'))!==null){
                clientes=JSON.parse(localStorage.getItem('clientes'));
                if(parametro==="todos"){
                        //Mostrar array clientes
                        mostrarClientes(clientes);
                }else if(parametro==="dni"){
                        select=document.getElementById("select");
                        let cliAux=clientes.filter(cliente=>cliente.dni==select.value);
                        //Mostrar cliAux
                        mostrarClientes(cliAux);
                }else if(parametro==="nombre"){
                        txtCli = document.getElementById("txt_buscar_cli");
                        let cliAux=clientes.filter(cliente=>cliente.nombre>=txtCli.value)
                        //Mostrar cliAux
                        //cliAux.sort((a,b)=> a.nombre - b.nombre);
                        cliAux.sort((a,b)=> a.nombre.localeCompare(b.nombre))
                        //const rta = paddockType.sort((a,b) => a.name.localeCompare(b.name))
                        mostrarClientes(cliAux);
                }
        }else{
                let contenedorClientes=document.querySelector('.contenedor_resultados');
                contenedorClientes.innerHTML="";
        }    
}

const mostrarClientes=(clientes)=>{
        let array_clientes=clientes;
        let contenedorClientes=document.querySelector('.contenedor_resultados')
        let filaCliente=document.createElement('div');
        let titulo_listado=document.querySelector('.titulo_listado');
        let titulo_fecha=document.querySelector('.fecha');

        let fechaActual=new Date();
        let dia=fechaActual.getDate();
        let mes=fechaActual.getMonth()+1;
        let anio=fechaActual.getFullYear();

        titulo_listado.textContent="LISTADO DE CLIENTES";
        titulo_fecha.textContent=`${dia}/${mes}/${anio}`;
        titulo_fecha.style.cssText='font-size: 12px;'

        contenedorClientes.appendChild(filaCliente);
        array_clientes.forEach((cliente)=>{
                filaCliente.innerHTML+=`<div class="filaCli d-flex flex-column justify-content-center   col-12 rounded">
                                        <p class="p_nombreCli"><B>NOMBRE</B>   ${cliente.nombre}</p>
                                        <p><B>DNI</B>   ${cliente.dni}</p>
                                        <p><B>E-MAIL   </B> ${cliente.email}</p>
                                        <p><B>DOMICILIO   </B> ${cliente.domicilio}</p>
                                        </div>`
        
            });
 
        filaCliente.style.cssText='width:100%; padding-bottom: 100px;';
        filaCliente.classList.add('esta_poronga');
        filaCliente.classList.add('container-fluid');    
        filaCliente.classList.add('row');
        filaCliente.classList.add('d-flex');  
        filaCliente.classList.add('justify-content-center');  
        filaCliente.classList.add('align-items-center');
        filaCliente.classList.add('p-0');
        filaCliente.classList.add('m-0');

        let fila=[];
        fila=document.getElementsByClassName('filaCli');
            
        for (cadafila of fila){
                cadafila.style.cssText=`border: 1px solid; text-align: left; width: 95%; padding: 5px;`;
        }

        let parrafos=filaCliente.getElementsByTagName('p');
        for (cadaparrafo of parrafos){
                cadaparrafo.style.cssText='margin-left:100px;';
        }

        let p_nombreCli=[];
        p_nombreCli=document.getElementsByClassName('p_nombreCli');
        for(cadaCliente of p_nombreCli){
                cadaCliente.style.cssText='margin-left:250px;';
        }
}
        

const informeReservas=(parametro)=>{
        let reservas=[];
        if(JSON.parse(localStorage.getItem('reservas'))!==null){
                reservas=JSON.parse(localStorage.getItem('reservas'));
                if(parametro==="todos"){
                        //Mostrar array reservas todas
                        mostrarReservas(reservas);
                }else if(parametro==="periodo"){
                        let f1=document.querySelector('.dtp_in');
                        let f2=document.querySelector('.dtp_out');

                        let resAux=reservas.filter(reserva=>(Date.parse(reserva.fechaIngreso)>=Date.parse(f1.value)) && (Date.parse(reserva.fechaIngreso)<=(Date.parse(f2.value))) );  
                        //Mostrar resAux
                        mostrarReservas(resAux);
                        console.log(resAux)
                }else if(parametro==="fechain"){
                        let f1=document.querySelector('.dtp_in');
                        let resAux=[];
                        reservas.forEach((reserva)=>{
                                let fechaAux=new Date(reserva.fechaIngreso);
                                let fechaAux2=new Date(f1.value);
                                let fechaParseada = (fechaAux.getDate()+2)+"/"+(fechaAux.getMonth()+1)+"/"+fechaAux.getFullYear();
                                let fechaParseada2 =(fechaAux2.getDate()+2)+"/"+(fechaAux2.getMonth()+1)+"/"+fechaAux2.getFullYear();
                                
                                if(fechaParseada===fechaParseada2){
                                        resAux.push(reserva);
                                }
                            });
                        //Mostrar cliAux
                        mostrarReservas(resAux); 
                }else if(parametro==="cliente"){
                        select=document.getElementById("select");
                        let resAux=reservas.filter(reserva=>reserva.dni==select.value);
                        //Mostrar cliAux
                        mostrarReservas(resAux);
                }
        } else{
                let contenedorReservas=document.querySelector('.contenedor_resultados');
                contenedorReservas.innerHTML="";
        }    
}

const mostrarReservas=(reservas)=>{
        let array_reservas=reservas;
        let contenedorReservas=document.querySelector('.contenedor_resultados');
        let filaReservas=document.createElement('div');
        let titulo_listado=document.querySelector('.titulo_listado');
        let titulo_fecha=document.querySelector('.fecha');

        let fechaActual=new Date();
        let dia=fechaActual.getDate();
        let mes=fechaActual.getMonth()+1;
        let anio=fechaActual.getFullYear();

        titulo_listado.textContent="LISTADO DE RESERVAS";
        titulo_fecha.textContent=`${dia}/${mes}/${anio}`;
        titulo_fecha.style.cssText='font-size: 12px;';

        contenedorReservas.appendChild(filaReservas);

        array_reservas.forEach((reserva)=>{
                f1=new Date(reserva.fechaIngreso);
                f2=new Date(reserva.fechaEgreso);
                f1.setDate(f1.getDate()+1);
                f2.setDate(f2.getDate()+1);
                
                filaReservas.innerHTML+=`<div class="filaCli d-flex flex-column justify-content-center   col-12 rounded">
                                        <div>
                                                <p><B>RESERVA NÚMERO </B>   ${reserva.nro}</p>
                                        </div>
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-6">
                                                        <p><B>NOMBRE DEL CLIENTE    </B>   ${reserva.nombre}</p>
                                                </div>
                                                <div class="col-6">
                                                       <p><B>DNI   </B> ${reserva.dni}</p>
                                                </div>
                                        </div>
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-6">
                                                        <p><B>FECHA DE INGRESO   </B> ${f1.getDate()}/${f1.getMonth()+1}/${f1.getFullYear()}</p>
                                                </div>
                                                <div class="col-6">
                                                        <p><B>FECHA DE EGRESO   </B> ${f2.getDate()}/${f2.getMonth()+1}/${f2.getFullYear()}</p>
                                                </div>
                                        </div>
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-6">
                                                        <p><B>CANTIDAD DE NOCHES DE ALOJAMIENTO   </B> ${reserva.estadia}</p>
                                                </div>
                                                <div class="col-6">
                                                        <p><B>VALOR NOCHE DE ALOJAMIENTO   </B> $${reserva.costoPorNoche}</p>
                                                </div>
                                        </div>
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-6">
                                                        <p><B>CANTIDAD DE PASAJEROS   </B> ${reserva.cantPasajeros}</p>
                                                </div>
                                                <div class="col-6">
                                                <p><B>VALOR TOTAL ESTADÍA   </B> $${reserva.costoPorNoche*reserva.estadia}</p>
                                                </div>
                                        </div>`       
            });
      
        filaReservas.style.cssText='width:100%; padding-bottom: 100px;';
        filaReservas.classList.add('container-fluid');    
        filaReservas.classList.add('row');  
        filaReservas.classList.add('d-flex');  
        filaReservas.classList.add('justify-content-center');  
        filaReservas.classList.add('align-items-center');
        filaReservas.classList.add('p-0');
        filaReservas.classList.add('m-0');

        let fila=[];
        fila=document.getElementsByClassName('filaCli');
            
        for (cadafila of fila){
                cadafila.style.cssText='border: 1px solid; text-align: left; width: 95%; padding: 5px;';
        }

        let parrafos=filaReservas.getElementsByTagName('p');
        for (cadaparrafo of parrafos){
                cadaparrafo.style.cssText='margin-left:100px;';
        }
}


const informeFacturacion=(parametro=>{
        let reservas=[];
        if(JSON.parse(localStorage.getItem('reservas'))!==null){
                reservas=JSON.parse(localStorage.getItem('reservas'));
                if(parametro==="todos"){
                        //Mostrar array reservas todas
                        mostrarFacturacion(reservas,"todos");
                }else if(parametro==="periodo"){
                        let f1=document.querySelector('.dtp_in');
                        let f2=document.querySelector('.dtp_out');
                        let resAux=reservas.filter(reserva=>(Date.parse(reserva.fechaIngreso)>=Date.parse(f1.value)) && (Date.parse(reserva.fechaIngreso)<=Date.parse(f2.value)) );  
                        //Mostrar resAux
                        resAux.sort((a, b) => Date.parse(a.fechaIngreso) - Date.parse(b.fechaIngreso))
                        console.log(resAux)
                        
                        mostrarFacturacion(resAux,"periodo");
                }else if(parametro==="cliente"){
                        select=document.getElementById("select");
                        let resAux=reservas.filter(reserva=>reserva.dni==select.value);
                        //Mostrar cliAux
  
                        mostrarFacturacion(resAux,"cliente");
                }
        }else{
                let contenedorReservas=document.querySelector('.contenedor_resultados');
                contenedorReservas.innerHTML="";
        }         
});

const mostrarFacturacion=(reservas,parametro)=>{
        let array_reservas=reservas;
        let contenedorReservas=document.querySelector('.contenedor_resultados');
        let filaReservas=document.createElement('div');
        let titulo_listado=document.querySelector('.titulo_listado');
        let titulo_fecha=document.querySelector('.fecha');

        let fechaActual=new Date();
        let dia=fechaActual.getDate();
        let mes=fechaActual.getMonth()+1;
        let anio=fechaActual.getFullYear();

        titulo_listado.textContent="INFORME DE FACTURACIÓN";
        titulo_fecha.textContent=`${dia}/${mes}/${anio}`;
        titulo_fecha.style.cssText='font-size: 12px;';

        contenedorReservas.appendChild(filaReservas);
        let totalFacturado=0;

        //subtitulo del Informe
        filaReservas.innerHTML=`<div>
                                        <p class="titulo_fac"></p>
                                </div>`
        let titulo_fac = document.querySelector('.titulo_fac');
        if(parametro==="total"){
                titulo_fac.textContent=`Facturación Total`
        }else if(parametro==="periodo"){
                const dtp_in=document.querySelector('.dtp_in');
                const dtp_out=document.querySelector('.dtp_out');
                let f1 = new Date(dtp_in.value);
                let f2 = new Date(dtp_out.value);
                titulo_fac.textContent=`Facturación para el Período ${f1.getDate()}/${f1.getMonth()+1}/${f1.getFullYear()}  a  ${f2.getDate()}/${f2.getMonth()+1}/${f2.getFullYear()}`
        }else if(parametro==="cliente"){
                select=document.getElementById("select");
                titulo_fac.textContent=`Facturación Cliente DNI: ${select.value}`
        }

        titulo_fac.style.cssText='font-size:14px; font-weight: bold; text-align:center; padding:6px; border-radius:6px;'

        array_reservas.forEach((reserva)=>{
                totalFacturado+=(reserva.costoPorNoche*reserva.estadia);
                f1=new Date(reserva.fechaIngreso);
                f2=new Date(reserva.fechaEgreso);
                f1.setDate(f1.getDate()+1);
                f2.setDate(f2.getDate()+1);
                
                filaReservas.innerHTML+=`<div class="filaCli d-flex flex-column justify-content-center   col-12 rounded">
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-3">
                                                        <p><B>RESERVA NÚMERO </B>   ${reserva.nro}</p>
                                                </div>
                                                <div class="col-3">
                                                <p><B>INGRESO   </B> ${f1.getDate()}/${f1.getMonth()+1}/${f1.getFullYear()}</p>
                                                </div>
                                                <div class="col-3">
                                                <p><B>EGRESO   </B> ${f2.getDate()}/${f2.getMonth()+1}/${f2.getFullYear()}</p>
                                                </div>
                                                <div class="col-3">
                                                <p><B>subTOTAL ESTADÍA   </B> $${reserva.costoPorNoche*reserva.estadia}</p>
                                                </div>
                                        </div>`       
            });
      
        //Total Facturado
        let txtTotalFac=document.createElement('div');
        filaReservas.appendChild(txtTotalFac);
        txtTotalFac.innerHTML=`<p class="p_totalFac"></p>`;
        
        let p_totalFac=document.querySelector('.p_totalFac');
        p_totalFac.textContent="Total Facturado $"+totalFacturado;
        

        filaReservas.style.cssText='width:100%; padding-bottom: 100px;';
        filaReservas.classList.add('container-fluid');    
        filaReservas.classList.add('row');  
        filaReservas.classList.add('d-flex');  
        filaReservas.classList.add('justify-content-center');  
        filaReservas.classList.add('align-items-center');
        filaReservas.classList.add('p-0');
        filaReservas.classList.add('m-0');

        let fila=[];
        fila=document.getElementsByClassName('filaCli');
            
        for (cadafila of fila){
                cadafila.style.cssText='text-align: left; width: 95%; padding: 5px;';
        }

        p_totalFac.style.cssText='margin:30px; font-size:14px; font-weight: bold; text-align:center; padding:6px; border-radius:6px;'
}
//Boton Salir de la Ventana de Administración
let btnSalir=document.querySelector('.btn_salir_listados');

btnSalir.addEventListener('click',(e)=>{
        e.preventDefault();
        openVentanaAdmin.classList.remove('modal--show');
});
