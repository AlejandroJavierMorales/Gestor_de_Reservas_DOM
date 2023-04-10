const contenedor_resultado_habitaciones=document.querySelector('.busqueda__resultados__contenedor')



function renderizarHabitaciones(){
    let arrayHabitaciones = leerHabitaciones() || [];
    console.log(arrayHabitaciones);
    arrayHabitacionesSeleccionadas=[];

    
    

    contenedor_resultado_habitaciones.innerHTML+='';
    let a=0;
    arrayHabitaciones.forEach((habitacion)=>{
        a++;
            contenedor_resultado_habitaciones.innerHTML+=`<div class="col-md-6 fila_id d-flex justify-content-evenly pt-3">
                                                             <div class="fila">  
                                                               <span>ID Habitación: <B>${habitacion.id}</B></span>
                                                               <span>Nombre: <B>${habitacion.nombre}</B></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 fila_pasajeros d-flex justify-content-evenly pt-3">
                                                            <div class="fila">
                                                                <span>Cantidad de Pasajeros: <B>${habitacion.pasajeros}</B></span>
                                                                <span>Precio por Noche: <B>$${habitacion.precio}</B></span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6" fila_imagen>
                                                            <img src="${habitacion.imagen}" class="img-fluid imagen"></img>
                                                        </div>
                                                        <div class="col-md-6 fila_descripcion">
                                                        <span><B>DESCRIPCIÓN: </B> </span> <span>${habitacion.descripcion}</span>
                                                        </div>
                                                            <div class="col-12 p-4 ">
                                                                <div>
                                                                    <input class="form-check-input estilos_checkbox" type="checkbox" name="check${habitacion.id}" id="check${habitacion.id}" onclick="seleccionar_habitacion(${habitacion.id})"><label class="lbl_Check" id="label${habitacion.id}" for="check${habitacion.id}"> Seleccionar Habitación</label>
                                                                </div>
                                                                <div>
                                                                    <select class="select_cant" name="lista_cantidad_${habitacion.id}" id="lista_cantidad_${habitacion.id}" disabled onchange="seleccionar_cantidad_habitaciones(${habitacion.id}, value, ${habitacion.precio})">
                                                                        <option value="0" selected>Cantidad</option>
                                                                        <option value="1" >1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>    
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                        <option value="6">6</option>
                                                                        <option value="7">7</option>
                                                                        <option value="8">8</option>
                                                                        <option value="9">9</option>
                                                                        <option value="10">10</option>
                                                                    </select>                                                  
                                                                </div>                                                                                                                                                                                    
                                                            </div>
                                                        <div>
                                                             <hr>
                                                        </div>`
    });
    
    contenedor_resultado_habitaciones.innerHTML+=`<div>
                                                        <a href="../index.html" class="btn btn_confirmar_habitacion">Confirmar Selección</a>
                                                  </div>`

    document.querySelector('.btn_confirmar_habitacion').addEventListener('click',(e)=>{
            
            (e).preventDefault();
            let seleccionOk=0;
            
            //crear objeto Reserva y mostrar ventana con info
            if(arrayHabitacionesSeleccionadas.length>0){
                reservaEnCurso.fechaIngreso=document.querySelector('.busqueda_periodo_inicio').textContent;
                reservaEnCurso.fechaEgreso=document.querySelector('.busqueda_periodo_fin').textContent;
                cargarDatosHabitaciones();
                seleccionOk=1
            }else{
                (Swal.fire({
                    text: "Por favor Debe Seleccionar, al menos, una Habitacion",
                    icon: "warning",
                  }));
                  seleccionOk=0;
            }
            if(seleccionOk===1){

                contenedor_resultado_habitaciones.innerHTML='';
                document.querySelector('.formulario_modal').classList.add('modal--show');           
                arrayClientes = JSON.parse(localStorage.getItem('clientes')) || [];
                arrayReservas=JSON.parse(localStorage.getItem('reservas')) || [];   
                    if (arrayReservas.length-1 >=0){
                            cantReservas=parseInt(arrayReservas[arrayReservas.length-1].nro); //Actualiza el nro de la ultima reserva registrada
                    }else{
                            cantReservas=0;
                    }
            }                                             
    });
}

function seleccionar_habitacion(habitacion){
    document.getElementById(`check${habitacion}`).checked===true ?  document.getElementById(`lista_cantidad_${habitacion}`).disabled=false 
    :   (
        document.getElementById(`lista_cantidad_${habitacion}`).value="0",
        document.getElementById(`lista_cantidad_${habitacion}`).disabled=true
        ) 
    if(arrayHabitacionesSeleccionadas.length>0){
        arrayHabitacionesSeleccionadas=arrayHabitacionesSeleccionadas.filter(registro=>registro.habitacion !== habitacion)

    }
}

function seleccionar_cantidad_habitaciones(habitacion, cantidad, precio){
    let objHabitacion={
        habitacion:habitacion,
        cantidad:cantidad,
        precio:precio,
    }
    let arrayHabAux=[];

    //Buscar en arrayHabitaciones si el Nro de habitacion esta cargado, si esta cambiar cantidad, si no esta, pushearla
    if(arrayHabitacionesSeleccionadas.length===0){
        arrayHabitacionesSeleccionadas.push(objHabitacion);
    }else{
        arrayHabAux=arrayHabitacionesSeleccionadas;
        arrayHabAux=arrayHabitacionesSeleccionadas.filter(cadaHab=>cadaHab.habitacion===habitacion);
        if(arrayHabAux.length>0){
            arrayHabitacionesSeleccionadas.forEach((registro)=>{
                if(registro.habitacion===habitacion){
                    registro.cantidad=cantidad;
                }
            });
            
        }else{
            arrayHabitacionesSeleccionadas.push(objHabitacion);
        }
    }
}

function vista_bienvenida(){
    contenedor_resultado_habitaciones.classList.add('busqueda_estilo_bienvenida')
    contenedor_resultado_habitaciones.innerHTML+=` <div>
                                                        <span class="msj_bienvenida">Reservá Tu Alojamiento...</span>
                                                    </div>
                                                    <div class="mb-5 div_bienvenida_2">
                                                        <span class="msj_bienvenida_2 ">encontrá la opción que se ajusta a tus planes</span>
                                                    </div>`
}

function cargarDatosHabitaciones(){
    reservaEnCurso.habitacion=arrayHabitacionesSeleccionadas;
}