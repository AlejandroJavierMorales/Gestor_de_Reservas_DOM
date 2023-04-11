/********************* LISTADOS *******************/
/**************************************************/
const botonAceptar = document.querySelector(".btn_aceptar_listados");
const cuerpoListados = document.querySelector('.contenedor_resultados');
let bdHabitaciones=leerHabitaciones();
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
        const radiosDOM=[radioCliTodos,radioCliDni,radioCliNombre,radioResTodos,radioResPeriodo,radioResFechaIn,radioResCliente,radioFacTodos,radioFacPeriodo,radioFacCliente];   
     return radiosDOM;
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
              }));
            
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
              }));
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
              }));
    } 
});

const formato_listados=()=>{
 cuerpoListados.innerHTML=`
                                  <header class="cabecera_listado row col-12">
                                        <div class="header_logo_listado  col-4">
                                                <img class="img-fluid rounded" src="./assets/images/logo_hotel.jpg" id="logo_hotel_listado" alt="logo hotel">
                                        </div>
                                        <div class="container-fluid text-center col-8 d-flex justify-content-center">
                                           <div class="row d-flex justify-content-center align-items-center col-12">
                                                <div class="col-9 ">
                                                        <h2  class="titulo_listado titulo_listado_facturacion">Listado</h2>
                                                </div>
                                                <div class="col-3  text-center">
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
                                                <div class="row d-flex justify-content-evenly align-items-center">
                                                        <div class="col-4 text-center ">
                                                                <button class="btn btn-warning btn_eliminar_item_listado" onclick="eliminarItemListado(${cliente.dni},'clientes');" title="Eliminar Cliente">
                                                                        <img src="../assets/images/trash.svg" alt="Eliminar Cliente" width="16" />
                                                                </button>
                                                        </div>
                                                        <div class="col-8 text-center">
                                                                <p class="p_nombreCli text-start"><B>NOMBRE</B>   ${cliente.nombre}</p>
                                                        </div>
                                                        <div class="col-4">
                                                                <p><B>DNI</B>   ${cliente.dni}</p>
                                                        </div>
                                                        <div class="col-8">
                                                                <p><B>TELÉFONO   </B> ${cliente.telefono}</p>
                                                        </div>
                                                        <div class="col-12">
                                                                <p><B>E-MAIL   </B> ${cliente.email}</p>
                                                        </div>
                                                </div>        
                                        </div>`
            });
        filaCliente.classList.add('estilo_cliente');
        filaCliente.classList.add('container-fluid');    
        filaCliente.classList.add('row');
}
        

const informeReservas=(parametro)=>{
        
        let reservas=JSON.parse(localStorage.getItem('reservas'));

        if(reservas.length>0){        
                if(parametro==="todos"){

                        mostrarReservas(reservas);
                }else if(parametro==="periodo"){
                        let f1=document.querySelector('.dtp_in');
                        let f2=document.querySelector('.dtp_out');

                        let resAux=reservas.filter(reserva=>(Date.parse(parsearFechaString(reserva.fechaIngreso))>=Date.parse(f1.value)) && (Date.parse(parsearFechaString(reserva.fechaIngreso))<=(Date.parse(f2.value))) );  

                        mostrarReservas(resAux);
                        console.log(resAux)
                }else if(parametro==="fechain"){
                        let f1=document.querySelector('.dtp_in');
                        let resAux=[];
                        reservas.forEach((reserva)=>{

                                let fechaAux=new Date(parsearFechaString(reserva.fechaIngreso));
                                let fechaAux2=new Date(f1.value);
                              
                                let fechaParseada = (fechaAux.getDate())+"/"+(fechaAux.getMonth()+1)+"/"+fechaAux.getFullYear();
                                let fechaParseada2 =(fechaAux2.getDate()+1)+"/"+(fechaAux2.getMonth()+1)+"/"+fechaAux2.getFullYear();
                                
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

        let x=0
        array_reservas.forEach((reserva)=>{
                f1=new Date(reserva.fechaIngreso);
                f2=new Date(reserva.fechaEgreso);
                f1.setDate(f1.getDate()+1);
                f2.setDate(f2.getDate()+1);
                
                
                filaReservas.innerHTML+=`<div class="filaCli filaRes d-flex flex-column justify-content-center col-12 rounded">
                                                <div class="text-start">
                                                        <button class="btn btn-warning btn_eliminar_item_listado" onclick="eliminarItemListado(${reserva.nro},'reservas');" title="Eliminar Reserva">
                                                                <img src="../assets/images/trash.svg" alt="Eliminar Cliente" width="16" />
                                                        </button>    
                                                        <B>RESERVA NÚMERO </B>   ${reserva.nro}</p>

                                                </div>
                                                <div class="row d-flex justify-content-center align-items-center">
                                                        <div class="col-6 text-start div_res">
                                                                <p><B>NOMBRE DEL CLIENTE    </B>   ${reserva.nombre}</p>
                                                        </div>
                                                        <div class="col-6 text-start div_res">
                                                        <p><B>DNI   </B> ${reserva.dni}</p>
                                                        </div>
                                                </div>
                                                <div class="row d-flex justify-content-center align-items-center">
                                                        <div class="col-6 text-start div_res">
                                                                <p><B>FECHA DE INGRESO   </B> ${reserva.fechaIngreso}</p>
                                                        </div>
                                                        <div class="col-6 text-start div_res">
                                                                <p><B>FECHA DE EGRESO   </B> ${reserva.fechaEgreso}</p>
                                                        </div>
                                                </div>
                                                <div class="row d-flex justify-content-center align-items-center">
                                                        <div class="col-12 text-start">
                                                                <p><B>CANTIDAD DE NOCHES DE ALOJAMIENTO   </B> ${reserva.estadia}</p>
                                                        </div>
                                                
                                                </div>
                                                <div class="row d-flex justify-content-center align-items-center">
                                                        <div class="col-6 text-start">
                                                                <p><B>PASAJEROS ADULTOS </B> ${reserva.cantPasajerosAdultos}</p>
                                                        </div>
                                                        <div class="col-6 text-start">
                                                                <span><B>PASAJEROS MENORES   </B> ${reserva.cantPasajerosMenores}</span>
                                                                <span class="edad_menores${x}"></span>
                                                        </div>
                                                </div>
                                                <div class="container-fluid text-center d-flex justify-content-center contenedor_habitaciones_gral mt-4 mb-3">
                                                        <div class="contenedor_habitaciones${x} row d-flex justify-content-center align-items-center">
                                                        
                                                        </div>
                                                </div>
                                        </div>`   
               
                let edadMenores = reserva.edadMenores || [];
                let contenedor_edad_menores=document.querySelector(`.edad_menores${x}`)
                let a=0;
                if(edadMenores.length>0){
                        edadMenores.forEach(menor=>{
                        (a===0) ? (contenedor_edad_menores.innerHTML+=`  ( ${menor} `)
                        : (contenedor_edad_menores.innerHTML+=`,${menor} `)
                
                        a++
                        });
                        contenedor_edad_menores.innerHTML+=`Años )`
                } 
                  
          
               let arrayHabitaciones=reserva.habitacion || [];

                let contenedor_habitaciones = document.querySelector(`.contenedor_habitaciones${x}`)                      
                contenedor_habitaciones.innerHTML=`<div class="col-12 text-center habitaciones">
                                                        <B><span class="titulo_habitaciones mb-3" ">HABITACIONES</span></B>
                                                </div>`
                let valorTotalEstadia=0;
                arrayHabitaciones.forEach(habitacion=>{
                
                        let auxHab=bdHabitaciones.filter((habit)=>parseInt(habit.id)===parseInt(habitacion.habitacion));
                                
                        contenedor_habitaciones.innerHTML+=`     <div class="col-12 d-flex justify-content-start">
                                                                <B><span>Habitación (Id- ${habitacion.habitacion}): </span></B><span class="nombre_habitacion">${auxHab[0].nombre}</span>
                                                        </div>
                                                        <div class="col-6 d-flex justify-content-start">
                                                                <B><span>Cantidad: </span></B><span class="cantidad_habitacion">${habitacion.cantidad}</span>
                                                        </div>
                                                        <div class="col-6  d-flex justify-content-start">
                                                                <B><span>Precio por Noche: </span></B><span class="precio_habitacion">$${habitacion.precio}</span>
                                                        </div>`
                        valorTotalEstadia+=parseInt(habitacion.cantidad)*parseFloat(habitacion.precio);       
                });
                        valorTotalEstadia=valorTotalEstadia*reserva.estadia;
                        contenedor_habitaciones.innerHTML+=`<div class="col-12 d-flex justify-content-start precio_total_reserva">
                                                                        <B><span style="padding:5px;">VALOR TOTAL ESTADIA </span></B><span class="precio_total_estadia" style="padding:5px; border:solid 1px; border-radius:6px;">$${valorTotalEstadia}</span>
                                                                </div>`  
             
                x++;
                      
            });
        
        filaReservas.classList.add('container-fluid');    
        filaReservas.classList.add('row');
        filaReservas.classList.add('estilos_fila_reserva');
          
}


const informeFacturacion=(parametro=>{
        
        let reservas=JSON.parse(localStorage.getItem('reservas'));
        
        if(reservas.length>0){        
                if(parametro==="todos"){
                        mostrarFacturacion(reservas,"todos");
                }else if(parametro==="periodo"){
                        let f1=document.querySelector('.dtp_in');
                        let f2=document.querySelector('.dtp_out');
                        let resAux=reservas.filter(reserva=>(Date.parse(parsearFechaString(reserva.fechaIngreso))>=Date.parse(f1.value)) && (Date.parse(parsearFechaString(reserva.fechaIngreso))<=Date.parse(f2.value)) );  

                        resAux.sort((a, b) => Date.parse(a.fechaIngreso) - Date.parse(b.fechaIngreso))
                        
                        
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
        if(parametro==="todos"){
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
                f1=new Date(parsearFechaString(reserva.fechaIngreso));
                f2=new Date(parsearFechaString(reserva.fechaEgreso));
                f1.setDate(f1.getDate()+1);
                f2.setDate(f2.getDate()+1);
                
                filaReservas.innerHTML+=`<div class="filaCli d-flex flex-column justify-content-center col-12 rounded border" ">
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-3">
                                                        <button class="btn btn-warning btn_ver_detalle btn_detalle_reserva${reserva.nro}" onmouseover="verDetalleReserva(${reserva.nro});" title="Ver Detalle de Reserva">
                                                                <img src="../assets/images/buscar.png" alt="Ver Detalle de Reserva" style="width:32px;" />
                                                        </button>  
                                                        <p><B>RESERVA NÚMERO </B>   ${reserva.nro}</p>
                                                </div>
                                                <div class="col-3">
                                                <p><B>INGRESO   </B> ${f1.getDate()}/${f1.getMonth()+1}/${f1.getFullYear()}</p>
                                                </div>
                                                <div class="col-3">
                                                <p><B>EGRESO   </B> ${f2.getDate()}/${f2.getMonth()+1}/${f2.getFullYear()}</p>
                                                </div>
                                                <div class="col-3">
                                                <p><B>Total Estadía   </B> $${reserva.costoPorNoche*reserva.estadia}</p>
                                                </div>
                                                <div class="col-12  detalle_reserva_fac${reserva.nro} ocultar text-center">

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
    
        filaReservas.classList.add('estilos_facturacion');
        filaReservas.classList.add('container-fluid');    
        filaReservas.classList.add('row');  
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
                    confirmButtonText: 'Borrar',
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
                    confirmButtonText: 'Borrar',
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
const parsearFechaString = (fecha)=>{
        let fechaCadena=fecha
        let dia =fechaCadena.slice(0,fechaCadena.indexOf("/") );
        let mes =fechaCadena.slice(fechaCadena.indexOf("/")+1,fechaCadena.lastIndexOf("/"))
        let anio =fechaCadena.slice(fechaCadena.lastIndexOf("/")+1, fechaCadena.lastIndexOf("/")+5)
       
       let fechaParseada=anio+"-"+mes+"-"+dia;

       return fechaParseada
    }

const verDetalleReserva=(nro_reserva)=>{
        //alert(nro_reserva)
        
        let detalle_express=document.querySelector(`.detalle_reserva_fac${nro_reserva}`);
        
        let reservas=JSON.parse(localStorage.getItem('reservas')) || [];
       
        if(reservas.length>0){
                let reserva_buscada=reservas.filter(reserva_nro=>parseInt(reserva_nro.nro)===parseInt(nro_reserva));

                detalle_express.innerHTML=`<div class="row d-flex justify-content-center align-items-center">
                                                 <div class="col-6 text-start">
                                                        <p><B>NOMBRE DEL CLIENTE    </B>   ${reserva_buscada[0].nombre}</p>
                                                </div>
                                                <div class="col-6 text-start">
                                                        <p><B>DNI   </B> ${reserva_buscada[0].dni}</p>
                                                </div>
                                        </div>
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-12 text-start">
                                                        <p><B>NOCHES DE ALOJAMIENTO   </B> ${reserva_buscada[0].estadia}</p>
                                                </div>
        
                                        </div>
                                        <div class="row d-flex justify-content-center align-items-center">
                                                <div class="col-12 text-start">
                                                        <p><B>PASAJEROS ADULTOS </B> ${reserva_buscada[0].cantPasajerosAdultos}</p>
                                                </div>
                                                <div class="col-12 text-start">
                                                        <span><B>PASAJEROS MENORES   </B> ${reserva_buscada[0].cantPasajerosMenores}</span>
                                                        <span class="edad_menores_${nro_reserva}"></span>
                                                </div>
                                        </div>
                                        <div class="container-fluid text-center d-flex justify-content-center contenedor_habitaciones_gral mt-4 mb-3">
                                                <div class="contenedor_habitaciones${nro_reserva} row d-flex justify-content-center align-items-center">
                
                                                </div>
                                        </div>`;   

                let edadMenores = reserva_buscada[0].edadMenores || [];
                let contenedor_edad_menores=document.querySelector(`.edad_menores_${nro_reserva}`);
                let a=0;
                if(edadMenores.length>0){
                edadMenores.forEach(menor=>{
                (a===0) ? (contenedor_edad_menores.innerHTML+=`  ( ${menor} `)
                : (contenedor_edad_menores.innerHTML+=`,${menor} `);

                a++
                });
                contenedor_edad_menores.innerHTML+=`Años )`;
                } 
                //habitaciones
                let arrayHabitaciones=reserva_buscada[0].habitacion || [];

                let contenedor_habitaciones = document.querySelector(`.contenedor_habitaciones${nro_reserva}`)                      
                contenedor_habitaciones.innerHTML=`<div class="col-12 text-center">
                                                        <B><span class="titulo_habitaciones mb-3" ">HABITACIONES</span></B>
                                                </div>`
                arrayHabitaciones.forEach(habitacion=>{
                
                        let auxHab=bdHabitaciones.filter((habit)=>parseInt(habit.id)===parseInt(habitacion.habitacion));
                                
                        contenedor_habitaciones.innerHTML+=`<div class="col-sm-6 col-12 d-flex justify-content-start pt-2">
                                                                <B><span>Habitación (Id- ${habitacion.habitacion}): </span></B><span class="nombre_habitacion">${auxHab[0].nombre}</span>
                                                        </div>
                                                        <div class="col-sm-3 col-12 d-flex justify-content-start pt-2">
                                                                <B><span>Cantidad: </span></B><span class="cantidad_habitacion">${habitacion.cantidad}</span>
                                                        </div>
                                                        <div class="col-sm-3 col-12 d-flex justify-content-start pt-2">
                                                                <B><span>Precio por Noche: </span></B><span class="precio_habitacion">$${habitacion.precio}</span>
                                                        </div>`       
                });
                       

        }


        detalle_express.classList.remove('ocultar');
        let boton=document.querySelector(`.btn_detalle_reserva${nro_reserva}`)
        
        boton.addEventListener('mouseout',()=>{
                detalle_express.innerHTML='';
                detalle_express.classList.add('ocultar');
        })
                               
}