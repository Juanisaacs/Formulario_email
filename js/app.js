//Variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnReset = document.querySelector('#resetBtn');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners(){
    //Cuando la App arranca
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //Campos de formulario
    email.addEventListener('blur', validaFormulario); 
    asunto.addEventListener('blur', validaFormulario);
    mensaje.addEventListener('blur', validaFormulario);

    //Reiniciar el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}




//Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    
}

// valida validarFormulario
function validaFormulario(e){

    if(e.target.value.length > 0){

        // Elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
       
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
      
    }

    if(e.target.type === 'email') {
       
        
        if(er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
            
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no valido');
          
        }
    }  
    
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
    
}

//Enviar email

function enviarEmail(e) {
    e.preventDefault();

     //mostrar spinner
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     //Despues de 3 segundos se quita el espinner y nos miuestra el mensaje
     setTimeout(() =>{
         spinner.style.display = 'none';

         // mensaje de enviado
         const parrafo = document.createElement('p');
         parrafo.textContent = 'El mensaje se envio correctamente';
         parrafo.classList.add('text-center', 'my-5', 'p-2', 'bg-green-500','text-blue', 'font-bold', 'uppercase')

         formulario.insertBefore(parrafo, spinner);

         //elimina el mensaje de enviado
         setTimeout(() =>{
             parrafo.remove();

             resetearFormulario();
         },5000);

     }, 3000);

}

// Funciones para resetear formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}

