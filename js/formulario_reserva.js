


function leerDOMFormularioReserva(){
    const txtNombre=document.getElementById("nombre");
    const txtDni=document.getElementById("dni");
    const txtTelefono=document.getElementById("telefono");
    const txtEmail=document.getElementById("email");
    const arrayDOMFormularioReserva=[txtNombre,txtDni,txtTelefono,txtEmail];
    return arrayDOMFormularioReserva
}
function resetFormularioReserva(){
    const arrayDOMFormularioReserva= leerDOMFormularioReserva();
    arrayDOMFormularioReserva.forEach(campo => {campo.value=""});
}
 const calculoHabitacionesReservadas=()=>{
        let habitacionReservada=reservaEnCurso.habitacion;//TRAE DETALLE DE HABITACIONES RESERVADAS
        let detalleHabitacion=[];
        registroHabitaciones=leerHabitaciones();
        if (habitacionReservada.length===1){
                detalleHabitacion=registroHabitaciones.filter(item=>parseInt(item.id)===parseInt(habitacionReservada[0].habitacion))
        }else if(habitacionReservada.length>1){
                
                habitacionReservada.forEach((reserva)=>{
                        let auxHabitacion=registroHabitaciones.filter(item=>parseInt(item.id)===parseInt(reserva.habitacion))
                        auxHabitacion.length>0 ? detalleHabitacion.push(auxHabitacion[0]) : [];
                });     
        }       
        return detalleHabitacion;   
}

const parsearFechaString = (fecha)=>{
        let fechaCadena=fecha
    
        let dia =fechaCadena.slice(0,fechaCadena.indexOf("/") );
  
        let mes =fechaCadena.slice(fechaCadena.indexOf("/")+1,fechaCadena.lastIndexOf("/"))
       
        let anio =fechaCadena.slice(fechaCadena.lastIndexOf("/")+1, fechaCadena.lastIndexOf("/")+5)
       
       let fechaParseada=anio+"-"+mes+"-"+dia;

       return fechaParseada
    }
const restarFechasString=(fecha1, fecha2)=>{
      let  fechaA = new Date(fecha1).getTime();
      let  fechaB = new Date(fecha2).getTime();
 
      let fechaC=((fechaB-fechaA)/1000/60/60/24);
        return fechaC
}

//********************Validacion Formulario de Carga de Reserva***************************/
const validarFormulario=()=>{
    validacion[0]=1;

   //Array Validacion contiene en la posicion 0 un bit en "0" si hubo error y "1" si no lo hubo
   // y en la posicion 1 el nro corresponde al tipo de Erorr
  
   if((txtNombre.value =="") || ((txtNombre.value).trim().length)==0 ){
            validacion[0]=0;
            validacion[1]=1;
    }else if(txtDni.value.length !== 8){
            validacion[0]=0;
            validacion[1]=2;
            
    }else if (parseInt(txtTelefono.value) == 0 || txtTelefono.value =="" || /\D/.test(txtTelefono.value)){
            validacion[0]=0;
            validacion[1]=3;
    }else if(( txtEmail.value==""|| !(txtEmail.value).includes("@") || !(txtEmail.value).includes("."))){
            validacion[0]=0;
            validacion[1]=4;
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



btn_cancelar_reserva.addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.formulario_modal').classList.remove('modal--show')
    window.open("../pages/reservas.html");
});

//confirmacion de reserva - almacenamiento en "base de datos"
btn_confirmar_reserva.addEventListener('click', (e)=>{ //****Activa Evento Click del boton de cierrede ventana modal */
    e.preventDefault();
    
    arrayClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    arrayReservas=JSON.parse(localStorage.getItem('reservas')) || []; 
   
        if (arrayReservas.length-1 >=0){
            cantReservas=parseInt(arrayReservas[arrayReservas.length-1].nro); //Actualiza el nro de la ultima reserva registrada
        }else{
                cantReservas=0;
            }

    validarFormulario();
    //validacion[] es un array global

    if( parseInt(validacion[0])==1){
            //**** Si la carga de datos no tiene errores, guardado datos del Cliente y Reserva en Arrays correspondientes
            //y luego cerrar la ventana Modal
            // *** Con los Datos del Objeto reservaEnCurso Calcula todos los costos, pasajeros, fechas etc
            
       
        let costo=0;
        let id_habitacion;
        let pasajeros;
        


        let arrayHab=reservaEnCurso.habitacion;

        arrayHab.forEach((habitacion)=>{
                costo+=parseInt(habitacion.cantidad)*parseFloat(habitacion.precio);
        });
        id_habitacion=reservaEnCurso.habitacion;
        
        let fecha1 = parsearFechaString(reservaEnCurso.fechaIngreso);
        let fecha2 = parsearFechaString(reservaEnCurso.fechaEgreso);
        
        estadia=restarFechasString(fecha1,fecha2)


        fechaIn = reservaEnCurso.fechaIngreso;
        fechaOut = reservaEnCurso.fechaEgreso;
        
            totHuespedes+=parseInt(reservaEnCurso.pasajerosAdultos)+parseInt(reservaEnCurso.pasajerosMenores); //totalizador de huespedes 

            cantReservas++; //totalizador de Reservas vendidas
                 
            pasajeros=parseInt(reservaEnCurso.pasajerosAdultos)+parseInt(reservaEnCurso.pasajerosMenores);

            let cliente = new Cliente(txtDni.value,txtNombre.value,txtEmail.value,txtTelefono.value);

            let reservaGral = new Reserva(cantReservas,txtDni.value,txtNombre.value,fechaIn,fechaOut,estadia,parseInt(reservaEnCurso.pasajerosAdultos),parseInt(reservaEnCurso.pasajerosMenores),costo,id_habitacion,reservaEnCurso.edadMenores);
            
            if(validacion[1]===10){
                    arrayClientes.push(cliente);
            }
            arrayReservas.push(reservaGral);
            Swal.fire({
                    text: "La Reserva ha sido Registrada con Éxito!",
                    icon: "success",
                    showConfirmButton: false,
                  })
                  
            
            document.querySelector('.formulario_modal').classList.remove('modal--show');
            

            //Guarda en el LocalStorage
            localStorage.setItem('reservas', JSON.stringify(arrayReservas));
            localStorage.setItem('clientes', JSON.stringify(arrayClientes));
            
            let reserva_nueva=cantReservas;//Nro de la nueva reserva
            localStorage.setItem('reserva_registrada',JSON.stringify(reserva_nueva))

            window.open('/index.html','_self')

             /* setTimeout(() => window.open('/index.html','_self'), 1500);  */
        
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
            case 3: //error de Telefono
                    Swal.fire({
                            title: "Error",
                            text: "Error al Ingresar Nro. de Telefono",
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