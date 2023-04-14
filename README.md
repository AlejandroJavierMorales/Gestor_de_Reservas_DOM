# Gestor_de_Reservas_DOM
# Gestor_de_Reservas_DOM

NOTA: Tener presente que la información que maneja el sistema se almacena en LocalStorage (Reservas, Clientes, Usuarios) y en el archivo local habitaciones.json (habitaciones) y que la primera vez que ejecuta la aplicación, el LocalStorage estará vacío.

Los datos en habitaciones.json se leen via Fetch haciendo la petición a la ruta relativa del archivo JSON local al ingresar en la aplicación, cargando la información en un array global.

Librerías y APIs utilizadas:
Sweet Alert2 y Calendar conectados via CDN
EmailJS conectado via Fetch

Primeramente, para verificar el funcionamiento de la apliación, será necesario cargar algunas reservas para distintos clientes. Luego desde la ventana de Administracion se podrán visualizar los datos cargados.

********* FUNCIONAMIENTO **********:

RESERVA
En la pantalla inicial (index.html) encontraran un botón "Buscar Alojamiento", que redirecciona a reservas.html. Allí el usuario que quiera realizar la reserva podrá elegir el período de alojamiento, la cantidad de pasajeros adultos y menores (estos últimos con sus edades correspondientes) y la o las habitaciones y cantidad de las mismas que desee reservar.

Una vez seleccionada esa información, haciendo click en el botón "Confirmar Selección" se abrirá un formulario para cargar los datos de: Nombre, dni, telefono y email del cliente. Haciendo click en el botón Cancelar cancela el proceso de reserva, haciendo click en el boton Confirmar, se registra la reserva, se redirecciona a index.html donde se muestra el detalle de la reserva confirmada y se envía un email con el mismo al cliente.


ADMINISTRACION
En el encabezado de la página inicial se encuentra el botón "Admimistración". A través del mismo accederá el módulo de Administración, previa validación de ingreso con usuario y contraseña en la ventana modal de Login. 
Inicialmente no habra ningun usuario cargado. Coloque un Nombre de Usuario y Password, al "Aceptar", el sistema indicará que el usuario no existe y peruguntará si quiere registrarlo. Indique que Sí y la aplicación pedirá volver a introducir las credenciales para acceder a la Administración.

En la Ventana de Administración podrá visualizar clientes (todos, por DNI, por Nombre), Reservas (Todas, para un Periodo, por Fecha de Ingreso, por Cliente) y Facturación (total, en un período o por cliente).
Además podrá eliminar en forma individual un cliente o una reserva, actualizando automáticamente la información visualizada en pantalla. En caso de eliminar un cliente se eliminarán tambien todos los registros de reservas asociados al mismo.
El los listados de facturación, colocando el mouse sobre el boton con la lupa, desplegará en forma dinámica el detalle de la reserva correspondiente, eliminando el mismo a sacar el mouse del boton.



