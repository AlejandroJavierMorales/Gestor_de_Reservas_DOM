//*************************************************************************/
//************* INGRESO A ADMINISTRACION MODAL USER/PASSWORD **************/

const openModalLogin = document.querySelector('.btn_admin');
const modalLogin = document.querySelector('.login_modal');
const btnLoginModal = document.querySelector('.btn_login');
const btnLogOutModal =document.querySelector('.btn_logout');
const txtUsuario = document.getElementById("txt_usuario");
const txtPassword = document.getElementById("txt_password");
let registroDeUsuariosAux=[];
let registroDeUsuarios=[];

const openVentanaAdmin=document.querySelector('.ventana_administracion');

class Usuario {
        constructor(usuario, password) {
          this.usuario = usuario;
          this.password = password;
        }
      }


function leerDOMFormularioLogin(){
    const txtUsuario = document.getElementById("txt_usuario");
    const txtPassword = document.getElementById("txt_password");
    const arrayDOMFormularioLogin=[txtUsuario,txtPassword]
    return arrayDOMFormularioLogin;
}
function resetFormularioLogin(){
    const arrayDOMFormularioLogin= leerDOMFormularioLogin();
    arrayDOMFormularioLogin[0].value="";
    arrayDOMFormularioLogin[1].value="";

}
function resetVentanaAdministracion(){
    let resetVentanaAdministracion=document.querySelector('.contenedor_resultados');
    resetVentanaAdministracion.innerHTML="";
}
openModalLogin.addEventListener('click', (e)=>{
    e.preventDefault();
    modalLogin.classList.add('modal--show');
    resetFormularioLogin();
    
});
//Verifica Autenticacion, si esta Ok accede a administracion y cierra Login
btnLoginModal.addEventListener('click',(e)=>{
        e.preventDefault();
        //Verificar Credenciales
        if (txtUsuario.value !== null && txtPassword !== null){
                
                const newUser = new Usuario(txtUsuario.value,txtPassword.value)
                registroDeUsuariosAux = JSON.parse(localStorage.getItem('usuariosGR'));
                if (registroDeUsuariosAux === null) { 
                        Swal.fire({
                                title: 'Usuario Inexistente',
                                text: "...Desea Registrarlo?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Registrar',
                                cancelButtonText: 'Cancelar'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                        registroDeUsuarios.push(newUser);
                                        localStorage.setItem('usuariosGR', JSON.stringify(registroDeUsuarios));
                                        txtUsuario.value="";
                                        txtPassword.value="";
                                        Swal.fire({
                                                text: "Por Favor Vuelva a Ingresar sus Credenciales para acceder al Sistema...",
                                                icon: "success",
                                              });
                                }else{
                                        Swal.fire({
                                                title: "Usuario No Registrado",
                                                icon: "warning",
                                              });
                                }
                              })       
                }else{
                        //Trae los Usuarios Registrados
                        registroDeUsuarios = JSON.parse(localStorage.getItem('usuariosGR'));
                        //Busca en el array si el usuario actual ys existe, en caso que si, devuelve el objeto usuario encontrado
                        let usuario = registroDeUsuarios.filter(function(usuario) {
                                return usuario.usuario === txtUsuario.value;
                            });
                        
                        //Si NO encontro elusuario como existente...
                        if (usuario.length==0){
                                Swal.fire({
                                        title: 'Usuario Inexistente',
                                        text: "...Desea Registrarlo?",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'Registrar',
                                        cancelButtonText: 'Cancelar'
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                                registroDeUsuarios.push(newUser);
                                                localStorage.setItem('usuariosGR', JSON.stringify(registroDeUsuarios));
                                                txtUsuario.value="";
                                                txtPassword.value="";
                                                Swal.fire({
                                                        text: "Por Favor Vuelva a Ingresar sus Credenciales para acceder al Sistema...",
                                                        icon: "success",
                                                      });
                                        }else{
                                                Swal.fire({
                                                        title: "Usuario No Registrado",
                                                        icon: "warning",
                                                      });
                                        }
                                      })  
                        }else if(usuario.length===1){ //Si el Usuario Ya Existia...
                                if(usuario[0].password===txtPassword.value ){// y el password es el correcto (el amacenado) le da la Bienvenida y permite el ingreso a Administracion
                                modalLogin.classList.remove("modal--show");
                                //***Mostrar Ventana de Administracion */
                                openVentanaAdmin.classList.add('modal--show');
                                openVentanaAdmin.classList.remove("ocultar");
                                resetVentanaAdministracion();
                        }else {
                                Swal.fire({
                                        title:"Error",
                                        title: "El Password  Ingresado es Incorrecto...",
                                        icon: "warning",
                                      });
                                }
                        }     
                }       
        }else{
                Swal.fire({
                        title:"Error",
                        title: "Usuario o Password  Ingresado es Incorrecto...",
                        icon: "warning",
                      });         
        }
});
//Cancela Login y cierra ventana Modal
btnLogOutModal.addEventListener('click',(e)=>{
        e.preventDefault();
        modalLogin.classList.remove("modal--show")
});
