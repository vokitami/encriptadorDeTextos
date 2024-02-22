let tituloMensaje = document.getElementById('titulo-mensaje');
let parrafo = document.getElementById('parrafo');
const textoReflejo = document.getElementById('mensaje');

tiempoReal();
ocultar();
condicionesIniciales();

function encriptar(){
    //mensaje original
    let textoOriginal = document.getElementById('texto').value;
    //console.log(`mensaje original ${textoOriginal}`);
 
    //verifica si el texto contiene alguna mayuscula              
    let contieneMayusculas = /[A-Z]/.test(textoOriginal);
    //verifica si contiene carcteres especiales
    let contieneEspeciales = /[^\w\s]/.test(textoOriginal);
     
    //verifica si el contenido de texto esta vacio
    if(textoOriginal.length != 0){
        if((contieneMayusculas) || (contieneEspeciales)){
            console.log("verifica si contiene mayusculas o caracteres especiales");
            alerta("Ooops!", "Solo se permiten minúsculas y sin caracteres especiales.");
        }else{
                //remplazar las vocales por los valores
                let textoCifrado = textoOriginal 
                .replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g,"ai")
                .replace(/o/g,"ober")
                .replace(/u/g,"ufat");

                //el texto original se encripta
                //document.getElementById('texto').value = '';
                //se refleja
                Reflejo(textoCifrado);
        }
    }else{
        //Si no se cumple la condicion se muestra una alerta y se reinician los valores iniciales 
        //console.log('ejecutando alert')
        alerta("Ooops!","Debes ingresar algún texto...");
        condicionesIniciales();      
    }
}

function desencriptar(){
    let textoDesencriptado = document.getElementById('texto').value;
    //console.log('mesanaje desencriptado')

    //verifica si el texto contiene alguna mayuscula              
    let contieneMayusculas = /[A-Z]/.test(textoDesencriptado);
    //verifica si contiene carcteres especiales
    let contieneEspeciales = /[^\w\s]/.test(textoDesencriptado);

    //verifica si el contenido de texto esta vacio
    if(textoDesencriptado.length != 0){
        if((contieneMayusculas) || (contieneEspeciales)){
            //console.log("verifica si contiene mayusculas o caracteres especiales");
            alerta("Ooops!", "Solo se permiten minúsculas y sin caracteres especiales.");
        }else{
            let textoDesifrado = textoDesencriptado
                .replace(/ai/g, 'a')
                .replace(/enter/g, 'e')
                .replace(/imes/g, 'i')
                .replace(/ober/g, 'o')
                .replace(/ufat/g, 'u');
                //el texto original se encripta
                //document.getElementById('texto').value = '';
                //se refleja
                Reflejo(textoDesifrado);
        }
    }else{
        //Si no se cumple la condicion se muestra una alerta y se reinician los valores iniciales 
        //console.log('ejecutando alert')
        alerta("Ooops!","Debes ingresar algún texto...");
        condicionesIniciales();      
    }
}

function tiempoReal(){
    const textoInput = document.getElementById('texto');
   
    // Agrega un evento 'input' al campo de texto
    textoInput.addEventListener('input', function () {
        //console.log('Valor actual de textoInput:', textoInput.value);
            Reflejo(textoReflejo);    
            textoReflejo.value = this.value;  
    
        if(textoReflejo.value.length === 0){
               condicionesIniciales();
               encriptado = false;
            }
    });

        //agregar un resize para detectar cambio al tamaño de la ventana
        //para mostrar las condiciones iniciales o para reflejar el texto
        window.addEventListener('resize', function(){
            if(texto.value.length != 0){
                Reflejo(textoReflejo.value);
            }else{
                condicionesIniciales();
                mostrar();
                ocultar();
            }
           
        });
}

function condicionesIniciales(){
    //console.log('ejecutando iniciales');
    const anchoPantalla = window.innerWidth;
    
    if (anchoPantalla > 923) {
        // Solo establecer la imagen de fondo si no está en modo responsivo y hay texto
        //console.log("Ejecutando imagen");
        textoReflejo.style.backgroundImage = 'url(./img/principal.png)';
    } else {
        //console.log('ejecudando no imagen resposive');
        textoReflejo.style.backgroundImage = 'none';
    } 
 
    tituloMensaje.textContent = 'No se ha encontrado ningún mensaje';
    parrafo.textContent = 'Ingresa el texto que deseas encriptar o desencriptar...';
}

function Reflejo(texto) {
    //elimina la imagen
    textoReflejo.style.backgroundImage = 'none';
    textoReflejo.style.color = 'rgb(194, 188, 188)'; //le da color a las letras
    textoReflejo.value = texto; //refleja el contenido de texto
    tituloMensaje.textContent = ''; 
    parrafo.textContent = '';
}

function borrar(){
    //console.log('ejecutando borrar');
    //vacía texto y el reflejo
    document.getElementById('texto').value = '';
    document.getElementById('mensaje').value = '';
    condicionesIniciales();
}

function copiar(){
    navigator.clipboard.writeText(textoReflejo.value)
    .then(() => {
    //console.log('Contenido copiado al portapapeles');
      /* Resuelto - texto copiado al portapapeles con éxito */
    },() => {
      //console.error('Error al copiar');
      /* Rechazado - fallo al copiar el texto al portapapeles */
    });
}
 
function alerta(titulo, texto) {
    Swal.fire({
        position: "center",
        icon: 'warning',
        title: titulo,
        text: texto,
        showConfirmButton: false,
        timer: 1300,
        //personalizar la alerta 
        customClass: {
            popup:'swa12-custom',
            title:'swa12-title',
            content:'my-custom-text',
            icon:'swal2-icon'
        }
    });
}

function mostrar(){
    document.getElementById('sidebarFooter').style.visibility = 'visible';
    const anchoPantalla = window.innerWidth;
    //console.log('mostrando sidebar')
    
    if (anchoPantalla > 923) {
        document.getElementById('sidebarFooter').style.width = '25vw';
    } else {
        document.getElementById('sidebarFooter').style.width = '70vw';

    } 
    document.getElementById('creadorInfo').style.marginTop = '30vh';
    document.getElementById('abrir').style.display = 'none';
    document.getElementById('cerrar').style.display = 'inline';
    document.getElementById('abrirCerrar').style.display = 'inline';
    document.getElementById('creadorInfo').style.display = 'block';
}

function ocultar(){
    //console.log('ocultando sidebar')
    document.getElementById('sidebarFooter').style.visibility = 'hidden';
    document.getElementById('creadorInfo').style.marginLeft = '0';
    document.getElementById('creadorInfo').style.display = 'none';
    document.getElementById('abrir').style.display = 'inline';
    document.getElementById('cerrar').style.display = 'none';
    document.getElementById('abrirCerrar').style.display = 'none';
}
