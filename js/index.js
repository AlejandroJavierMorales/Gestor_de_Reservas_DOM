window.addEventListener("load", function(event) {
        let bdHabitaciones=leerHabitaciones();
        let reservaNueva=JSON.parse(this.localStorage.getItem('reserva_registrada'));
        setTimeout(() =>{
                if(reservaNueva!==0){

                        //Traer datos de la última Reserva confirmada
                        arrayReservas=JSON.parse(localStorage.getItem('reservas')) || [];
                        
                        if(arrayReservas.length>0){

                        let objReservaAux= new Reserva(arrayReservas[arrayReservas.length-1].nro,arrayReservas[arrayReservas.length-1].dni,arrayReservas[arrayReservas.length-1].nombre,arrayReservas[arrayReservas.length-1].fechaIngreso,arrayReservas[arrayReservas.length-1].fechaEgreso,arrayReservas[arrayReservas.length-1].estadia,arrayReservas[arrayReservas.length-1].cantPasajerosAdultos,arrayReservas[arrayReservas.length-1].cantPasajerosMenores,arrayReservas[arrayReservas.length-1].costoPorNoche,arrayReservas[arrayReservas.length-1].habitacion,arrayReservas[arrayReservas.length-1].edadMenores);
                                
                        //Accediendo al DOM para presentar datos en pantalla de la Ultima Reserva Registrada
                        let div_reserva_confirmada=document.querySelector(".reserva_confirmada");
                        div_reserva_confirmada.classList.remove("ocultar");
                        let detalle_reserva=document.querySelector('.reserva--detalle')
                        
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
                        let edadMenores = objReservaAux.edadMenores || [];
                        let contenedor_edad_menores=this.document.querySelector('.edad_menores')
                        let a=0;
                        if(edadMenores.length>0){
                                edadMenores.forEach(menor=>{
                                (a===0) ? (contenedor_edad_menores.innerHTML+=`  ( ${menor} `)
                                : (contenedor_edad_menores.innerHTML+=`,${menor} `)

                                a++
                                });
                        contenedor_edad_menores.innerHTML+=`Años )`
                        }
                        
                        let arrayHabitaciones=objReservaAux.habitacion || [];
                        
                        detalle_reserva.innerHTML+=     `<div class="col-12 text-center">
                                                                        <B><span class="habitaciones_titulo">HABITACIONES</span></B>
                                                                </div>`
                        

                        
                       
                        let valorTotalEstadia=0;

                        arrayHabitaciones.forEach(habitacion=>{

                                let auxHab=bdHabitaciones.filter((habit)=>parseInt(habit.id)===parseInt(habitacion.habitacion));
                
                                 detalle_reserva.innerHTML+=`     <div class="col-12">
                                                                                <B><span>Habitación (Id- ${habitacion.habitacion}): </span></B><span class="nombre_habitacion">${auxHab[0].nombre}</span>
                                                                        </div>
                                                                        <div class="col-6">
                                                                                <B><span>Cantidad: </span></B><span class="cantidad_habitacion">${habitacion.cantidad}</span>
                                                                        </div>
                                                                        <div class="col-6">
                                                                                <B><span>Precio por Noche: </span></B><span class="precio_habitacion">$${habitacion.precio}</span>
                                                                        </div>`
                                valorTotalEstadia+=parseInt(habitacion.cantidad)*parseFloat(habitacion.precio);       
                        });
                        valorTotalEstadia=valorTotalEstadia*objReservaAux.estadia;
                        detalle_reserva.innerHTML+=`<div class="col-12 precio_total_reserva">
                                                                <B><span>VALOR TOTAL ESTADIA </span></B><span class="precio_total_estadia" style="padding:5px; border:solid 1px;">$${valorTotalEstadia}</span>
                                                        </div>
                                                        <div class="col-12 nota_reserva">
                                                                <B><span>Muchas Gracias por Elegirnos! </span></B><span class="nota_final"> a la brevedad le llegará un correo electrónico con el detalle de su reserva y los datos bancarios para que pueda confirmarla con el depósito o transferencia corespondientes.</span>
                                                        </div>`
                                                        
                        div_reserva_confirmada.classList.add("estilo_reserva"); 
                        reservaNueva=0;
                        this.localStorage.setItem('reserva_registrada',JSON.stringify(reservaNueva))   
                        }
                        
                }
        } , 1000);
});


