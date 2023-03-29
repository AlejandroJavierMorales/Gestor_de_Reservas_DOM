/********************* LISTADOS *******************/
/**************************************************/
const botonAceptar = document.querySelector(".btn_aceptar_listados");
const cuerpoListados = document.querySelector('.contenedor_resultados');

function leerRadiosDOM(){
          
   
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
        const radiosDOM=[radioCliTodos,radioCliDni,radioCliNombre,radioResTodos,radioResPeriodo,radioResFechaIn,radioResCliente,radioFacTodos,radioFacPeriodo,radioFacCliente]   
     return radiosDOM
    }
botonAceptar.addEventListener('click',()=>{
        
       const arrayRadios=leerRadiosDOM();
       
       //* Listados de Clientes */
        if(radioClientes.checked===true){
            formato_listados();
            arrayRadios[0].checked===true ? informeClientes("todos") :
            arrayRadios[1].checked===true ? informeClientes("dni") :
            arrayRadios[2].checked===true ? informeClientes("nombre"):
            (Swal.fire({
                title: "Debe seleccionar una opcion",
                icon: "warning",
              }))
            
        }  
        //* Listados de Reservas */
 
        if(radioReservas.checked===true){
            formato_listados();

            arrayRadios[3].checked===true ? informeReservas("todos"):
            arrayRadios[4].checked===true ? informeReservas("periodo"):
            arrayRadios[5].checked===true ? informeReservas("fechain"):
            arrayRadios[6].checked===true ? informeReservas("cliente"):
            (Swal.fire({
                title: "Debe seleccionar una opcion",
                icon: "warning",
              }))
    } 

        //* Listados de Facturación */
        if(radioFacturacion.checked===true){
            formato_listados();
            arrayRadios[7].checked===true ? informeFacturacion("todos"):
            arrayRadios[8].checked===true ? informeFacturacion("periodo"):
            arrayRadios[9].checked===true ? informeFacturacion("cliente"):
            (Swal.fire({
                title: "Debe seleccionar una opcion",
                icon: "warning",
              }))
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
        
            let clientes=JSON.parse(localStorage.getItem('clientes')) || [];

          if(clientes.length>0){      
                if(parametro==="todos"){
                        mostrarClientes(clientes);
                }else if(parametro==="dni"){
                        select=document.getElementById("select");
                        let cliAux=clientes.filter(cliente=>cliente.dni==select.value);
                        mostrarClientes(cliAux);
                }else if(parametro==="nombre"){
                        txtCli = document.getElementById("txt_buscar_cli");
                        let cliAux=clientes.filter(cliente=>(cliente.nombre).startsWith(txtCli.value))
                        cliAux.sort((a,b)=> a.nombre.localeCompare(b.nombre))
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
                                        <button class="btn btn-warning" onclick="eliminarItemListado(${cliente.dni},'clientes');" title="Eliminar Cliente">
                                        <img src="../assets/images/trash.svg" alt="Eliminar Cliente" width="16" />
                                        </button>    
                                        <p class="p_nombreCli"><B>NOMBRE</B>   ${cliente.nombre}</p>
                                        <p><B>DNI</B>   ${cliente.dni}</p>
                                        <p><B>E-MAIL   </B> ${cliente.email}</p>
                                        <p><B>DOMICILIO   </B> ${cliente.domicilio}</p>
                                        </div>`
        
            });
 
        filaCliente.style.cssText='width:100%; padding-bottom: 100px;';
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
        
        let reservas=JSON.parse(localStorage.getItem('reservas'));

        if(reservas.length>0){        
                if(parametro==="todos"){

                        mostrarReservas(reservas);
                }else if(parametro==="periodo"){
                        let f1=document.querySelector('.dtp_in');
                        let f2=document.querySelector('.dtp_out');

                        let resAux=reservas.filter(reserva=>(Date.parse(reserva.fechaIngreso)>=Date.parse(f1.value)) && (Date.parse(reserva.fechaIngreso)<=(Date.parse(f2.value))) );  

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

                        mostrarReservas(resAux); 
                }else if(parametro==="cliente"){
                        select=document.getElementById("select");
                        let resAux=reservas.filter(reserva=>reserva.dni==select.value);

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
                                        <button class="btn btn-warning" onclick="eliminarItemListado(${reserva.nro},'reservas');" title="Eliminar Reserva">
                                        <img src="../assets/images/trash.svg" alt="Eliminar Cliente" width="16" />
                                        </button>    
                                                <B>RESERVA NÚMERO </B>   ${reserva.nro}</p>

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
        
        let reservas=JSON.parse(localStorage.getItem('reservas'));
        
        if(reservas.length>0){        
                if(parametro==="todos"){
                        mostrarFacturacion(reservas,"todos");
                }else if(parametro==="periodo"){
                        let f1=document.querySelector('.dtp_in');
                        let f2=document.querySelector('.dtp_out');
                        let resAux=reservas.filter(reserva=>(Date.parse(reserva.fechaIngreso)>=Date.parse(f1.value)) && (Date.parse(reserva.fechaIngreso)<=Date.parse(f2.value)) );  

                        resAux.sort((a, b) => Date.parse(a.fechaIngreso) - Date.parse(b.fechaIngreso))
                        console.log(resAux)
                        
                        mostrarFacturacion(resAux,"periodo");
                }else if(parametro==="cliente"){
                        select=document.getElementById("select");
                        let resAux=reservas.filter(reserva=>reserva.dni==select.value);
 
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
        totalFacturado=reservas.reduce((total, reserva) => total += reserva.costoPorNoche * reserva.estadia, 0);
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
function eliminarItemListado(id,tipoListado) {//listado es el array en el que voy a borrar un item, id es el identificado del item a borrar
    
    
    const radiosDOM=leerRadiosDOM();
    let listado_aux=[];
    
    if(tipoListado==="clientes"){ //Eliminar Cliente y Registros de Reservas Asociados
        listado=JSON.parse(localStorage.getItem("clientes")) || [];
       
        if(listado.length>0){
            let reservas=JSON.parse(localStorage.getItem("reservas")) || [];
            if(reservas.length>0){
                Swal.fire({
                    title: 'Pérdida de Información!',
                    text: "Si elimina el Cliente, perdera el registro de las reservas asociadas...Desea Borrarlo ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Registrar',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                       let reservas_aux = reservas.filter(item => parseInt(item.dni) !== parseInt(id));
                       
                       localStorage.setItem('reservas', JSON.stringify(reservas_aux));
                       
                       listado_aux = listado.filter(item => parseInt(item.dni) !== parseInt(id));
                      
                       localStorage.setItem('clientes', JSON.stringify(listado_aux));
                       formato_listados();
                       if(radiosDOM[0].checked===true){
                            informeClientes("todos");
                            }else if(radiosDOM[1]===true){
                                    informeClientes("dni");
                            }else if(radiosDOM[2].checked===true){
                                    informeClientes("nombre");
                        }
                       
                        Swal.fire({
                            title: "El Cliente, y sus registros asociados han sido Borrados con Éxito!",
                            icon: "success",
                            className:"ventana_alerta",
                          });
                    }else{
                            Swal.fire({
                                    title: "El Cliente no ha sido Borrado...",
                                    icon: "warning",
                                  });
                    }
                  })                   
            }
        }
    }else if(tipoListado==="reservas"){
            listado=JSON.parse(localStorage.getItem("reservas")) || [];
       
            if(listado.length>0){
                Swal.fire({
                    title: 'Eliminar Reserva!',
                    text: "Confirma eliminar este registro ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Registrar',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {

                       listado_aux = listado.filter(item => parseInt(item.nro) !== parseInt(id));
                       localStorage.setItem('reservas', JSON.stringify(listado_aux));
                       formato_listados();
                       if(radiosDOM[3].checked===true){
                            informeReservas("todos");
                            }else if(radiosDOM[4]===true){
                                    informeReservas("periodo");
                            }else if(radiosDOM[5].checked===true){
                                    informeReservas("fechain");                  
                        }else if(radiosDOM[6].checked===true){
                                    informeReservas("cliente");
                        }
                       
                        Swal.fire({
                            title: "La Reserva seleccionada ha sido Borrada con Éxito!",
                            icon: "success",
                            className:"ventana_alerta",
                          });
                    }else{
                            Swal.fire({
                                    title: "La Reserva no ha sido Borrada...",
                                    icon: "warning",
                                  });
                    }
                  })                   
            
            }
    }

}