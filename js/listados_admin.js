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
        const radiosDOM=[radioCliTodos,radioCliDni,radioCliNombre]
     /*,radioResTodos,radioResPeriodo,radioResFechaIn,radioResCliente,radioFacTodos,radioFacPeriodo,radioFacCliente]   
    */
     return radiosDOM
    }
botonAceptar.addEventListener('click',()=>{
  
       const arrayRadios=leerRadiosDOM();
        //alert(arrayRadios[0].checked.toString())
        //* Listados de Clientes */
        if(radioClientes===true){
                formato_listados();
                if(arrayRadios[0].checked===true){
                        alert(arrayRadios[0]);
                        informeClientes("todos");
                }else if(arrayRadios[1].checked==true){
                        alert(arrayRadios[1]);
                        informeClientes("dni");
                }else if(arrayRadios[2].checked==true){
                        alert(arrayRadios[2]);
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
                        mostrarClientes(clientes);
                }else if(parametro==="dni"){
                        select=document.getElementById("select");
                        let cliAux=clientes.filter(cliente=>cliente.dni==select.value);
                        mostrarClientes(cliAux);
                }else if(parametro==="nombre"){
                        txtCli = document.getElementById("txt_buscar_cli");
                        let cliAux=clientes.filter(cliente=>cliente.nombre>=txtCli.value)
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
                                                <p><img src="../assets/images/trash.svg" alt="Eliminar Reserva" title="Eliminar Reserva" width="16" />
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
        let reservas=[];
        if(JSON.parse(localStorage.getItem('reservas'))!==null){
                reservas=JSON.parse(localStorage.getItem('reservas'));
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
    //const carrito = cargarProductosCarrito();
    let listado_aux=[];
    
    if(tipoListado==="clientes"){
        listado=JSON.parse(localStorage.getItem("clientes")) || []
        console.log(listado);
        if(listado.length>0){
            listado_aux = listado.filter(item => item.dni !== id);
            console.log(listado_aux)
            //JSON.stringify(localStorage.setItem("clientes",listado_aux));
            if(radioCliTodos.checked===true){
                informeClientes("todos");
            }else if(radioCliDni.checked===true){
                    informeClientes("dni");
            }else if(radioCliNombre.checked===true){
                    informeClientes("nombre");
            }
        }
    }else if(tipoListado==="reservas"){
        mostrarReservas(listado_aux);
    }
    
    //renderProductosCarrito();
    //renderBotonCarrito();
}