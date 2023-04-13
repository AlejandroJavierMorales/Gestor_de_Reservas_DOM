
//***********************************************************/
//*************** VENTANA DE ADMINISTRACION *****************/
const radioClientes=document.getElementById("listado_cliente");
const radioReservas=document.getElementById("listado_reserva");
const radioFacturacion=document.getElementById("listado_facturacion");
const contenedorSubPanel=document.querySelector('.contenedor_subPanel');
const contenedorBotones=document.querySelector('.contenedor_botones');
let btnSalir=document.querySelector('.btn_salir_listados');


const subPanelClientes=()=>{
        contenedorSubPanel.innerHTML=`  <div class="col-4">
                                                <input class="" type="radio" name="cli" value="cli_todos" id="cli_todos" > <span>Todos</span>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="cli" value="cli_dni" id="cli_dni"> <span>x DNI</span>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="cli" value="cli_nombre"  id="cli_nombre"> <span>x Nombre</span>
                                        </div>
                                        <div class="contenedor_subpanel_clientes row d-flex justify-content-center ">
                                                
                                        </div>
                                        `;

}

const subPanelReservas=()=>{
        contenedorSubPanel.innerHTML=`  <div class="col-3">
                                                <input class="" type="radio" name="res" value="res_todos" id="res_todos" > <span>Todas</span>
                                        </div>
                                        <div class="col-3">
                                                <input class="" type="radio" name="res" value="res_periodo" id="res_periodo"> <span>Período</span>
                                        </div>
                                        <div class="col-3">
                                        <input class="" type="radio" name="res" value="res_fechaIn" id="res_FechaIn"> <span>Fecha Ingreso</span>
                                        </div>
                                        <div class="col-3">
                                                <input class="" type="radio" name="res" value="res_cliente"  id="res_cliente"> <span>Cliente</span>
                                        </div>
                                        <div class="contenedor_subpanel_reservas row d-flex justify-content-center ">
                                                
                                        </div>
                                        `;
}
const subPanelFacturacion=()=>{
        contenedorSubPanel.innerHTML=`  <div class="col-4">
                                                <input class="" type="radio" name="res" value="fac_todos" id="fac_todos"  > <span>Total</span>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="res" value="fac_periodo" id="fac_periodo"> <span>Período</span>
                                        </div>
                                        <div class="col-4">
                                                <input class="" type="radio" name="res" value="fac_cliente"  id="fac_cliente"> <span>Cliente</span>
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
        cargar_select('clientes');//carga dni

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
        registroDeClientesAux = JSON.parse(localStorage.getItem(contenido_a_cargar)) || [];
        
        if (registroDeClientesAux !== null) {
                
                registroDeClientesAux.forEach(element => {  
                        let existe = array.some((elemento) => elemento == element.dni);//busca de No cargar DNIs duplicados
                        if(!existe){
                            array.push(element.dni);    
                        }
                });
                
        addOptions("select", array);
        }
}      
// Funcion para agregar opciones a <select>
function addOptions(domElement, array) {
let select = document.getElementsByName(domElement)[0];

array.sort((a,b) => parseInt(a) - parseInt(b));

        for (value in array) {
        let option = document.createElement("option");
        option.text = array[value];
        select.add(option);
        }
}

//Pone en eccucha del evento clic a los radio buttons de clientes, reservas y facturacion en la cabacera
//de la ventana de administracion, los que dispararan luego los listados a mostrar en pantalla.
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

btnSalir.addEventListener('click',(e)=>{
        e.preventDefault();
        openVentanaAdmin.classList.remove('modal--show');
});
