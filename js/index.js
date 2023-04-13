
window.addEventListener("load", function(event) {
        let reservaNueva=JSON.parse(this.localStorage.getItem('reserva_registrada'));
        let mensaje=[];

        setTimeout(() =>{
                if(reservaNueva!==0){

                        //Traer datos de la última Reserva confirmada
                        arrayReservas=JSON.parse(localStorage.getItem('reservas')) || [];
                        
                        if(arrayReservas.length>0){

                        let objReservaAux= new Reserva(arrayReservas[arrayReservas.length-1].nro,arrayReservas[arrayReservas.length-1].dni,arrayReservas[arrayReservas.length-1].nombre,arrayReservas[arrayReservas.length-1].fechaIngreso,arrayReservas[arrayReservas.length-1].fechaEgreso,arrayReservas[arrayReservas.length-1].estadia,arrayReservas[arrayReservas.length-1].cantPasajerosAdultos,arrayReservas[arrayReservas.length-1].cantPasajerosMenores,arrayReservas[arrayReservas.length-1].costoPorNoche,arrayReservas[arrayReservas.length-1].habitacion,arrayReservas[arrayReservas.length-1].edadMenores);
                                
                        //Accediendo al DOM para presentar datos en pantalla de la Ultima Reserva Registrada
                        let div_reserva_confirmada=document.querySelector(".reserva_confirmada");
                        div_reserva_confirmada.classList.remove("ocultar");
                        let detalle_reserva=document.querySelector('.reserva--detalle');
                        
                        detalle_reserva.innerHTML=` <B><h5 class="text-center">Reserva</h5></B>
                                                                <div class="col-12 reserva_gral">
                                                                        <B><span>Reserva Nro: </span></B><span class="nro">${objReservaAux.nro}</span>
                                                                </div>
                                                                <div class="col-12 reserva_gral">
                                                                        <B><span>a Nombre de: </span></B><span class="nombre_cliente">${objReservaAux.nombre}</span>
                                                                </div>
                                                                <div class="col-12 reserva_gral">
                                                                        <B><span>DNI: </span></B><span class="dni">${objReservaAux.dni}</span>
                                                                </div>
                                                                <div class="col-12 reserva_gral">
                                                                        <B><span>CheckIn (16hs): </span></B><span class="f_ingreso">${objReservaAux.fechaIngreso}</span>
                                                                </div>
                                                                <div class="col-12 reserva_gral">
                                                                        <B><span>CheckOut (10hs): </span></B><span class="f_egreso">${objReservaAux.fechaEgreso}</span>
                                                                </div>
                                                                <div class="col-12 reserva_gral">
                                                                        <B><span>Estadía: </span></B><span class="estadia">${objReservaAux.estadia}</span><span> noches </span>
                                                                </div>
                                                                <div class="col-12 text-center">
                                                                        <B><span class="titulo_pasajeros">PASAJEROS</span></B>
                                                                </div>
                                                                <div class="col-12">
                                                                <B><span>Adultos: </span></B><span class="pasajeros_adultos">${objReservaAux.cantPasajerosAdultos}</span>
                                                                </div>
                                                                <div class="col-12">
                                                                        <B><span>Menores: </span></B><span class="pasajeros_menores">${objReservaAux.cantPasajerosMenores}</span>
                                                                        <span class="edad_menores"></span>
                                                                </div>`;
                        mensaje.push(objReservaAux.nro);
                        mensaje.push(objReservaAux.nombre);
                        mensaje.push(objReservaAux.dni);
                        mensaje.push(objReservaAux.fechaIngreso);
                        mensaje.push(objReservaAux.fechaEgreso);
                        let edadMenores = objReservaAux.edadMenores || [];
                        let contenedor_edad_menores=this.document.querySelector('.edad_menores');
                        let a=0;
                        if(edadMenores.length>0){
                                edadMenores.forEach(menor=>{
                                (a===0) ? (contenedor_edad_menores.innerHTML+=`  ( ${menor} `)
                                : (contenedor_edad_menores.innerHTML+=`,${menor} `);

                                a++;
                                });
                        contenedor_edad_menores.innerHTML+=`Años )`;
                        }
                        
                        mensaje.push(objReservaAux.cantPasajerosAdultos);
                        mensaje.push(objReservaAux.cantPasajerosMenores + contenedor_edad_menores.textContent);

                        let arrayHabitaciones=objReservaAux.habitacion || [];
                        
                        detalle_reserva.innerHTML+=     `<div class="col-12 text-center">
                                                                        <B><span class="habitaciones_titulo">HABITACIONES</span></B>
                                                                </div>`;
                        

                        
                       
                        let valorTotalEstadia=0;
                        
                        arrayHabitaciones.forEach(habitacion=>{
                                console.log("ArrayDeHabitaciones "+arrayDeHabitaciones);
                                let auxHab=arrayDeHabitaciones.filter((habit)=>parseInt(habit.id)===parseInt(habitacion.habitacion));
                                console.log("auxHab "+auxHab)
                                 detalle_reserva.innerHTML+=`     <div class="col-12">
                                                                                <B><span>Habitación (Id- ${habitacion.habitacion}): </span></B><span class="nombre_habitacion">${auxHab[0].nombre}</span>
                                                                        </div>
                                                                        <div class="col-6">
                                                                                <B><span>Cantidad: </span></B><span class="cantidad_habitacion">${habitacion.cantidad}</span>
                                                                        </div>
                                                                        <div class="col-6">
                                                                                <B><span>Precio por Noche: </span></B><span class="precio_habitacion">$${habitacion.precio}</span>
                                                                        </div>`;
                                mensaje.push(auxHab[0].nombre);
                                mensaje.push(habitacion.cantidad);
                                mensaje.push(habitacion.precio);
                                valorTotalEstadia+=parseInt(habitacion.cantidad)*parseFloat(habitacion.precio);
                                
                                
                        });
                        valorTotalEstadia=valorTotalEstadia*objReservaAux.estadia;
                        detalle_reserva.innerHTML+=`<div class="col-12 precio_total_reserva">
                                                                <B><span>VALOR TOTAL ESTADIA </span></B><span class="precio_total_estadia" style="padding:5px; border:solid 1px;">$${valorTotalEstadia}</span>
                                                        </div>
                                                        <div class="col-12 nota_reserva">
                                                                   <B><span>Muchas Gracias por Elegirnos! </span></B><span class="nota_final"> a la brevedad le llegará un correo electrónico con el detalle de su reserva y los datos bancarios para que pueda confirmarla con el depósito o transferencia corespondientes.</span>
                                                        </div>`
                                //completa el array si seleccionaron menos de 5 habitacions
                                for(i=mensaje.length;i<=21;i++){
                                        mensaje.push('');
                                }
                                mensaje.push(valorTotalEstadia);
                        div_reserva_confirmada.classList.add("estilo_reserva"); 
                        reservaNueva=0;
                        localStorage.setItem('reserva_registrada',JSON.stringify(reservaNueva));
                        
                        let clienteEmail=JSON.parse(localStorage.getItem('clientes'));
                        clienteEmail=clienteEmail.filter(cliente=>cliente.dni===objReservaAux.dni);
                        clienteEmail.length>0 ? enviarEmail(clienteEmail[0].nombre,clienteEmail[0].email,mensaje)
                        :  Swal.fire({
                                title: "Error",
                              text: "No se encontro la direccion de correo electrónico",
                            icon: "warning",
                         });
                        }
                        
                }
        } , 1200);
});




const enviarEmail=(nombre, email, mensaje)=>{

let mensajeEmail=mensaje || [];
reserva_nro=mensajeEmail[0] || [''];
nombre_cli=mensajeEmail[1] || [''];
dni_cli=mensajeEmail[2] || [''];
fecha_ingreso=mensajeEmail[3] || [''];
fecha_egreso=mensajeEmail[4] || [''];
adultos=mensajeEmail[5] || [''];
menores=mensajeEmail[6] || [''];
mensajeEmail[7] !== null ? hab1=mensajeEmail[7] : hab1='';
(mensajeEmail[8] !== null || mensajeEmail[8].length<2) ? cant1=mensajeEmail[8] : cant1='';
mensajeEmail[9] !== '' ? precio1='$'+mensajeEmail[9] : precio1='';
mensajeEmail[10] !== null ? hab2=mensajeEmail[10] : hab2='';
(mensajeEmail[11] !== null || mensajeEmail[11].length<2) ? cant2=mensajeEmail[11] : cant2='';
mensajeEmail[12] !== '' ? precio2='$'+mensajeEmail[12] : precio2='';
mensajeEmail[13] !== null ? hab3=mensajeEmail[13] : hab3='';
(mensajeEmail[14] !== null || mensajeEmail[14].length<2) ? cant3=mensajeEmail[14] : cant3='';
mensajeEmail[15] !== '' ? precio3='$'+mensajeEmail[15] : precio3='';
mensajeEmail[16] !== null ? hab4=mensajeEmail[16] : hab4='';
(mensajeEmail[17] !== null || mensajeEmail[17].length<2) ? cant4=mensajeEmail[17] : cant4='';
mensajeEmail[18] !== '' ? precio4='$'+mensajeEmail[18] : precio4='';
mensajeEmail[19] !== null ? hab5=mensajeEmail[19] : hab5='';
(mensajeEmail[20] !== null || mensajeEmail[20].length<2) ? cant5=mensajeEmail[20] : cant5='';
mensajeEmail[21] !== '' ? precio5='$'+mensajeEmail[21] : precio5='';
tot_estadia=mensajeEmail[mensajeEmail.length-1] || [''];

        let data={
                    service_id: 'service_b6r6z5e',
                    template_id: 'template_x357qkg',
                    user_id: 'kQEngu40eUN502B3w',
                    template_params: {
                        to_name: nombre,
                        reply_to: email,
                        reserva_nro: reserva_nro,
                        nombre_cli: nombre_cli,
                        dni_cli: dni_cli,
                        fecha_ingreso: fecha_ingreso,
                        fecha_egreso: fecha_egreso,
                        adultos: adultos,
                        menores: menores,
                        hab1: hab1,
                        cant1: cant1,
                        precio1: precio1,
                        hab2: hab2,
                        cant2: cant2,
                        precio2: precio2,
                        hab3: hab3,
                        cant3: cant3,
                        precio3: precio3,
                        hab4: hab4,
                        cant4: cant4,
                        precio4: precio4,
                        hab5: hab5,
                        cant5: cant5,
                        precio5: precio5,
                        tot_estadia: tot_estadia
                    }
        }
        
        
            fetch('https://api.emailjs.com/api/v1.0/email/send',
            {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                      }
            })
            .then(function(response) {
                Swal.fire({
                        text: "Se ha enviado un Correo Electrónico con los Datos de su Reserva... Muchas Gracias por Elegirnos!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                      });
            })
            .catch(function(error) {
                Swal.fire({
                        text: "No se pudo procesar la erición de envío de correo electrónico..."+ JSON.stringify(error),
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                
            }); 
        
        }
        
        
        
        
