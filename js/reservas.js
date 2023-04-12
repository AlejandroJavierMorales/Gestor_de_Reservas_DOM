/* leerHabitaciones() */ //Levanta detalle de habitaciones del JSON
//bdHabitaciones=arrayDeHabitaciones;


//Definicion de Reserva: Periodo y Cantidad de pasajeros
const btn_busqueda_fecha=document.querySelector('.busqueda__fecha');
const contenedor_busqueda_fecha=document.querySelector('.busqueda__calendario__contenedor');
const contenedor_busqueda_pasajeros=document.querySelector('.busqueda__pasajeros__contenedor');
const btn_busqueda_pasajeros=document.querySelector('.busqueda__pasajeros');
const btn_adultos_mas=document.getElementById('adultos_mas');
const btn_adultos_menos=document.getElementById('adultos_menos');
const btn_menores_mas=document.getElementById('menores_mas');
const btn_menores_menos=document.getElementById('menores_menos');
const btn_listo=document.getElementById('btn_listo');
const cantidad_adultos=document.getElementById('adultos_cantidad');
const cantidad_menores=document.getElementById('menores_cantidad');
let busqueda_pasajeros_adultos=document.querySelector('.busqueda__pasajeros__adultos');
let busqueda_pasajeros_menores=document.querySelector('.busqueda__pasajeros__menores');
const divs_edad_menores=document.querySelector('.edad_menores')
const btn_buscar = document.querySelector('.busqueda_btn')
let periodo_inicio=document.querySelector('.busqueda_periodo_inicio');
let periodo_fin=document.querySelector('.busqueda_periodo_fin');

let arrayMenores=[];
let fechaInicio;
let fechaFin;
let clic=0; 


vista_bienvenida();


//Definicion de Fecha de Reserva
btn_busqueda_fecha.addEventListener('click',()=>{//contenedor de spans de fecha ingreso y egreso

    contenedor_busqueda_fecha.classList.remove('ocultar');
    contenedor_busqueda_pasajeros.classList.add('ocultar')
    const calendarEl = document.getElementById('calendar');
    contenedor_resultado_habitaciones.classList.add('ocultar');
  
    const calendar = new FullCalendar.Calendar(calendarEl, { //FullCalendar
      headerToolbar: {
        left: 'prev,next today',
        center: '',
        right: 'title',
      },
      locale:'es',
  
      navLinks: false, 
      selectable: true,
      selectMirror: false,
      select: function( arg ) {
        let start=arg.start
        let end=arg.end
        // Quitamos 1 segundo para que no añade un día más
        var endDate = new Date( end );
        endDate     = new Date( endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 0, 0, -1 );

        periodo_inicio=document.querySelector('.busqueda_periodo_inicio');
        periodo_fin=document.querySelector('.busqueda_periodo_fin');
        fechaInicio = dateFormat( start );
        fechaFin    = dateFormat( endDate );
        
        if(fechaInicio===fechaFin){//1 solo click, si son distintos => rango
            if(clic==0){
                fechaInicio = dateFormat( start );
                periodo_inicio.innerText=(`${fechaInicio}`);
                
            }if(clic==1){
                fechaFin    = dateFormat( start );
                periodo_fin.innerText=(`${fechaFin}`);
                
                contenedor_busqueda_fecha.classList.add('ocultar');
                contenedor_resultado_habitaciones.classList.remove('ocultar');
                contenedor_resultado_habitaciones.innerHTML='';
                
                reservaEnCurso.fechaIngreso=fechaInicio;
                reservaEnCurso.fechaEgreso=fechaFin;
                vista_bienvenida();
                clic=-1;
            }
        }else{
            
            fechaInicio = dateFormat( start );
            fechaFin    = dateFormat( endDate );
            periodo_inicio.innerText=(`${fechaInicio}`);
            periodo_fin.innerText=(`${fechaFin}`);
           
            contenedor_busqueda_fecha.classList.add('ocultar');
            contenedor_resultado_habitaciones.classList.remove('ocultar');
            contenedor_resultado_habitaciones.innerHTML='';
           
            reservaEnCurso.fechaIngreso=fechaInicio;
            reservaEnCurso.fechaEgreso=fechaFin;
             vista_bienvenida();
             clic=-1; 
        }
            clic++;
    },
    
});

    calendar.render();
})


// Función para formatear las fechas 
function dateFormat( df ) {
    
    var date  = new Date( df );
    
    let day   = date.getDate();
    let month = date.getMonth() + 1;
    let year  = date.getFullYear();
    return day + '/' + month + '/' + year;
}

//Definicion de Cantidad de Pasajeros
btn_busqueda_pasajeros.addEventListener('click',()=>{
    
    contenedor_busqueda_fecha.classList.add('ocultar');
    contenedor_busqueda_pasajeros.classList.remove('ocultar');
    cantidad_adultos.textContent=`0`;
    cantidad_menores.textContent=`0`;
    divs_edad_menores.innerHTML=''
    let cant_adultos=0;
    let cant_menores=0;
    arrayMenores=[];
    
    contenedor_resultado_habitaciones.classList.add('ocultar');

    btn_adultos_mas.addEventListener('click',()=>{
        cant_adultos++
        cantidad_adultos.textContent=cant_adultos;
    });
    btn_adultos_menos.addEventListener('click',()=>{
        if(cant_adultos>0){
            cant_adultos--
        }
        cantidad_adultos.textContent=cant_adultos;
    });

    btn_menores_mas.addEventListener('click',(e)=>{
        e.preventDefault(); 
        cant_menores++
        cantidad_menores.textContent=cant_menores;
        divs_edad_menores.innerHTML=''
        for(a=0; a<cant_menores;a++){
            //armar divs con edades para cada menor
            divs_edad_menores.innerHTML+=`<div class="col-6"><input type="number" id="menor${a+1}" placeholder="edad en años"></div>`
        }
    });
    btn_menores_menos.addEventListener('click',()=>{
        if(cant_menores>0){
            cant_menores--;
            divs_edad_menores.innerHTML=''
            if(cant_menores>0){
                for (i = 0; i < cant_menores; i++)
                    //armar divs con edades para cada menor
                    divs_edad_menores.innerHTML+=`<div class="col-6"><input type="number" id="menor${cant_menores}"  placeholder="edad en años"></div>`;
            }
            (cant_menores==0) ? (
                divs_edad_menores.innerHTML='',
                cantidad_menores.textContent=cant_menores
            ) : (
            cantidad_menores.textContent=cant_menores
            )
        }
    });

    btn_listo.addEventListener('click',()=>{
        busqueda_pasajeros_adultos.textContent=`${cantidad_adultos.textContent} Adultos`;
        busqueda_pasajeros_menores.textContent=`${cantidad_menores.textContent} Menores`;
        cant_menores=parseInt(cantidad_menores.textContent)
        
        if (cant_menores>0){
            
            for(i=0;i<cant_menores;i++){
                let edad=document.getElementById(`menor${i+1}`);
                 if(edad !== null){ 
                    arrayMenores.push(edad.value);
                 }
            }
            let edad_Ok=0
            arrayMenores.forEach((edad)=>{
                (edad==="") ? edad_Ok++ : edad_Ok;
            });
            
            (edad_Ok>0) ? (
                (Swal.fire({
                    text: "Por favor complete la Edad de los pasajeros menores",
                    icon: "warning",
                  })),
                  edad_Ok=0,
                  cant_menores=0,
                  arrayMenores=[]
            ) : (
                contenedor_busqueda_pasajeros.classList.add('ocultar'),
                divs_edad_menores.innerHTML='',
                cant_adultos=0,
                cant_menores=0,

                contenedor_resultado_habitaciones.classList.remove('ocultar'),
                contenedor_resultado_habitaciones.innerHTML=''
            )
            vista_bienvenida();
            cargaDatosPasajeros(arrayMenores);
    }else{
        contenedor_busqueda_pasajeros.classList.add('ocultar');
        divs_edad_menores.innerHTML='';
        cant_adultos=0;
        cant_menores=0;
        contenedor_resultado_habitaciones.classList.remove('ocultar');
        contenedor_resultado_habitaciones.innerHTML='';
        vista_bienvenida();
        cargaDatosPasajeros(arrayMenores);
    }
        

    });
});

btn_buscar.addEventListener('click',()=>{

         if((periodo_inicio.textContent === '##/##/####') || (periodo_fin.textContent === '##/##/####') ||
         (busqueda_pasajeros_adultos.textContent === '0 Adultos') ){
        }else{
            renderizarHabitaciones();
        }
        
});

function cargaDatosPasajeros(arrayMenores){
    let arrayDeMenores=arrayMenores;

    reservaEnCurso.pasajerosAdultos=document.getElementById('adultos_cantidad').textContent;
    reservaEnCurso.pasajerosMenores=document.getElementById('menores_cantidad').textContent;
    arrayDeMenores!=null ? reservaEnCurso.edadMenores=arrayDeMenores : reservaEnCurso.edadMenores="PP";
}

