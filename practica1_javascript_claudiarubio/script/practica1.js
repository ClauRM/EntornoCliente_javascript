//OBTENEMOS LOS ELEMENTOS DEL HTML
//VARIABLES DE CONFIRGURACION
var mensajes = document.getElementById("mensajes");

var nombreConf = document.getElementById("nombreConf");
var apellido1Conf = document.getElementById("apellido1Conf");
var apellido2Conf = document.getElementById("apellido2Conf");
var empresaConf = document.getElementById("empresaConf");
var cargoConf = document.getElementById("cargoConf");
var telfConf = document.getElementById("telfConf");
var emailConf = document.getElementById("emailConf");
var fotoConf = document.getElementById("fotoConf");
var colorFondo = document.getElementById("colorFondo");
var colorLetra = document.getElementById("colorLetra");
var reset = document.getElementById("reset"); //boton reset campos
var generar = document.getElementById("generar"); //boton generar QR
var barraProgreso = document.getElementById("barraProgreso"); //barra de progreso

var progreso = 0.0; //ancho inicial de la barra de progreso para completar el 100 (12.5*8)
var arCamposCompletos = [0, 0, 0, 0, 0, 0, 0, 0]; /*array de 8 posiciones para controlar los campos que están cumplimentados ok =1
posicion [0] = nombre
posicion [1] = apellido1
posicion [2] = apellido2
posicion [3] = empresa
posicion [4] = cargo
posicion [5] = telefono
posicion [6] = email
posicion [7] = foto
*/

//VARIABLES DE VISTA PREVIA
var nombreView = document.getElementById("nombreView");
var apellido1View = document.getElementById("apellido1View");
var apellido2View = document.getElementById("apellido2View");
var empresaView = document.getElementById("empresaView");
var cargoView = document.getElementById("cargoView");
var telfView = document.getElementById("telfView");
var emailView = document.getElementById("emailView");
var colorView = document.getElementById("colorView");
var codigoQR = document.getElementById("codigoQR");

//ponemos un "escuchador" en cada campo de configuracion para que al cambiar de casilla se desencadene un evento y 
//llame a la funcion duplicar para validar el dato tecleado y ponerlo en la vista previa si es correcto
//o mostrar un error si no es correcto
nombreConf.addEventListener("focusout", duplicar);
apellido1Conf.addEventListener("focusout", duplicar);
apellido2Conf.addEventListener("focusout", duplicar);
empresaConf.addEventListener("focusout", duplicar);
cargoConf.addEventListener("blur", duplicar);
telfConf.addEventListener("focusout", duplicar);
emailConf.addEventListener("focusout", duplicar);
fotoConf.addEventListener("change", duplicar, false);

//ponemos un "escuchador" sobre los botones y campos de edicion de imagen
reset.addEventListener("click", resetar); //boton reset
colorFondo.addEventListener("input", duplicar, false);//boton de color de fondo
colorLetra.addEventListener("input", duplicar, false);//boton de color de letra
generar.addEventListener("click", generarQR, false); //boton para generar qr


/**
 * FUNCION PARA DUPLICAR LOS DATOS DE CONFIGURACION EN VISTA PREVIA
 * @param {*} e recibe como parametro el evento (clase event)
 */
function duplicar(e) {

  try {
    //obtenemos el id del input que desata el evento correspondiente (focusout,change..) y guardamos en variable
    let idInput = e.currentTarget.id;
    //obtenemos el dato marcado en el campo que esta "escuchando" el evento 
    let cadena = e.srcElement.value;

    //switch para duplicar el campo en funcion del id del input que ha desencadenado el evento
    //busca el campo correspondiente y valida el dato antes de duplicarlo en vista previa 

    switch (idInput) {
      //identificamos el id del input y llamamos a la respectiva funcion que valida si la cadena es correcta

      case "nombreConf":
        f_nombreYapellidos(cadena, idInput, nombreView, 0);
        break;

      case "apellido1Conf":
        f_nombreYapellidos(cadena, idInput, apellido1View, 1);
        break;

      case "apellido2Conf":
        f_nombreYapellidos(cadena, idInput, apellido2View, 2);
        break;

      case "empresaConf":
        f_empresaConf(cadena, idInput);
        break;

      case "cargoConf":
        f_cargoConf(cadena, idInput);
        break;

      case "telfConf":
        f_telfConf(cadena, idInput);
        break;

      case "emailConf":
        f_emailConf(cadena, idInput);
        break;

      case "fotoConf":
        cargarFoto(idInput); //cargar foto seleccionada en vista previa
        break;

      case "colorFondo":
        cambiarColor(); //cambia el color de fondo
        break;

      case "colorLetra":
        cambiarColor(); //cambia el color de letra
        break;
    }

  } catch (error) {
    console.error("Ha ocurrido un error en la función duplicar");
  }
}

//FUNCIONES SEGUN EL CASE. VALIDARAN QUE EL DATO INTRODUCIDO SEA CORRECTO
//si lo es aniade su contenido en la vista previa, sino manda error
///////////////////////////////////////////////////

/**
 * 
 * FUNCION QUE VALIDA LOS DATOS DE LOS CAMPOS 1, 2, 3  NOMBRE Y APELLIDOS
 * @param {*} cadena cadena introducida en un campo tipo input
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 * @param {*} campoView el respectivo elemento espejo de la vista previa
 * @param {*} posicion posicion correspondiente del campo en el array arCamposCompletos
 */
function f_nombreYapellidos(cadena, idInput, campoView, posicion) {
  try {
    if (isTextoOk(cadena, idInput)) {
      campoView.innerHTML = cadena; // duplicamos cadena en la vista previa
      arCamposCompletos[posicion] = 1; //ponemos un 1=ok en su posicion del array
      progreso = siguientePaso(); //la barra de progreso aumenta
      limpiarError(idInput); //limpia los errores que hibiera previamente
    } else {
      arCamposCompletos[posicion] = 0; //ponemos un 0=ko en su posicion del array
      progreso = siguientePaso(); //la barra de progreso no aumenta
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función f_nombreYapellidos")
  }
}


/**
 * FUNCION QUE VALIDA LOS DATOS DEL CAMPO 4 EMPRESA
 * @param {*} cadena cadena introducida el campo tipo input
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 */
function f_empresaConf(cadena, idInput) {
  try {
    //minimo caracteres "X SA"
    //no validamos caracteres especiales puesto que puede contener (. , - ' & numeros)
    if (!(cadena.trim().length >= 4)) {
      mostrarError(idInput, "Mínimo cuatro caracteres en campo " + campo(idInput)); //llamamos al metodo que muestra el error
      arCamposCompletos[3] = 0; //ponemos un 0=ko en su posicion del array
      progreso = siguientePaso(); //la barra de progreso no aumenta
    } else {
      empresaView.innerHTML = cadena; // duplicamos cadena en la vista previa
      arCamposCompletos[3] = 1; //ponemos un 1=ok en su posicion del array
      progreso = siguientePaso(); //la barra de progreso aumenta
      limpiarError(idInput); //limpia los errores que hibiera previamente
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función f_empresaConf");
  }
}


/**
 * FUNCION QUE VALIDA LOS DATOS DEL CAMPO 5 CARGO
 * @param {*} cadena cadena seleccionada en el campo tipo select
 * @param {*} idInput id del campo input de seleccion
 */
function f_cargoConf(cadena, idInput) {
  try {
    //validamos que se haya seleccionado una opcion del desplegable
    if ((cadena.trim() == "")) { // si es vacia no se habra seleccionado un cargo
      mostrarError(idInput, "Seleccione un cargo"); //llamamos al metodo que muestra el error
      arCamposCompletos[4] = 0; //ponemos un 0=ko en su posicion del array
      progreso = siguientePaso(); //la barra de progreso no aumenta
    } else {
      cargoView.innerHTML = cadena; // duplicamos cadena en la vista previa
      arCamposCompletos[4] = 1; //ponemos un 1=ok en su posicion del array
      progreso = siguientePaso(); //la barra de progreso aumenta
      limpiarError(idInput); //limpia los errores que hibiera previamente
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función f_cargoConf");
  }
}


/**
 * FUNCION QUE VALIDA LOS DATOS DEL CAMPO 6 MOVIL
 * @param {*} cadena cadena introducida el campo tipo input
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 */
function f_telfConf(cadena, idInput) {
  try {
    if (isTelfOk(cadena, idInput)) {
      telfView.innerHTML = cadena; //duplicamos cadena en vista previa
      arCamposCompletos[5] = 1; //ponemos un 1=ok en su posicion del array
      progreso = siguientePaso(); //la barra de progreso aumenta
      limpiarError(idInput); //limpia los errores que hibiera previamente
    } else {
      arCamposCompletos[5] = 0; //ponemos un 0=ko en su posicion del array
      progreso = siguientePaso(); //la barra de progreso no aumenta
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función f_telfConf");
  }
}


/**
 * FUNCION QUE VALIDA EL CAMPO 7 EMAIL
 * @param {*} cadena cadena introducida el campo tipo input
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 */
function f_emailConf(cadena, idInput) {
  try {
    if (isMailOk(cadena, idInput)) {
      emailView.innerHTML = cadena; //duplicamos cadena en vista previa
      arCamposCompletos[6] = 1; //ponemos un 1=ok en su posicion del array
      progreso = siguientePaso(); //la barra de progreso aumenta
      limpiarError(idInput); //limpia los errores que hibiera previamente
    } else {
      arCamposCompletos[6] = 0; //ponemos un 0=ko en su posicion del array
      progreso = siguientePaso(); //la barra de progreso no aumenta
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función f_emailConf");
  }
}


/**
 * FUNCION QUE VALIDA QUE SE HAYA CARGADO UNA FOTO EN EL CAMPO 8 PARA MOSTRARLA EN LA VISTA PREVIA
 * @param {*} idInput id del campo input de seleccion de fichero
 */
function cargarFoto(idInput) {
  try {
    let preview = document.querySelector("img"); //obtenemos todos los datos de la caja de img de la vista pevia
    let foto = fotoConf.files[0]; //obtenemos la URL del fichero leido
    let lector = new FileReader(); // API FileReader para leer el contenido del fichero
    let loadFoto = false; //valor inicial no se ha cargado fichero

    lector.addEventListener("load", function () { //"escuchador" sobre el lector cuando se cargue el fichero
      preview.src = lector.result; //cambiamos el scr de la imagen por el leido por el lector cuando se cargue la foto vista previa
      arCamposCompletos[7] = 1; //ponemos un 1=ok en su posicion del array
      progreso = siguientePaso(); //la barra de progreso aumenta
      limpiarError(idInput); //limpia los errores que hibiera previamente
      loadFoto = true; //se ha cargado fichero
    }, false);

    if (foto) {
      lector.readAsDataURL(foto); //lector lee los datos del fichero cargado
    }

    if (!loadFoto) {
      mostrarError(idInput, "Seleccione una foto"); //llamamos al metodo que muestra el error
      arCamposCompletos[7] = 0; //ponemos un 0=ko en su posicion del array
      progreso = siguientePaso(); //la barra de progreso no aumenta
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función cargarFoto");
  }
}


/**
 * FUNCION PARA VALIDAR QUE LA CADENA INTRODUCIDA ES UN TEXTO
 * @param {*} cadena cadena introducida el campo tipo input
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 * @returns booleano: true si el texto es Ok, false si es Ko
 */
function isTextoOk(cadena, idInput) {
  try {
    let isTextoOk = true; //inicializamos variable en true para recorrer la cadena caracter a caracter, false si no es texto
    let i = 0; //variable para revisar cada caracter de la cadena
    let caracter = 0; //variable para almacenar un caracter de la cadena

    //1. limpiamos la cadena de espacios
    cadena = cadena.trim();

    //2. validamos la longitud de la cadena minimo 2 caracteres
    if (!(cadena.length >= 2)) {
      isTextoOk = false; //si no cumple la longitud mostrar error
      mostrarError(idInput, "Mínimo dos caracteres en campo " + campo(idInput)); //llamamos al metodo que muestra el error
    }

    //3. validamos si la cadena contiene solo letras o espacios
    while (i < cadena.length && isTextoOk) {
      caracter = cadena.charAt(i); //almacenamos la posicion i de la cadena en la variable caracter a revisar
      //validamos si el caracter convertido en ASCII .charCodeAt() esta comprendido entre 97 a y 122 z o 65 A y 90 Z o es un espacio 32
      if ((caracter.charCodeAt() > 64 && caracter.charCodeAt() < 91) || (caracter.charCodeAt() > 96 && caracter.charCodeAt() < 123) || caracter.charCodeAt() == 32) {
        i++; //incrementamos contador para revisar la siguiente letra
      } else {
        isTextoOk = false; // si no es letra, entonces istexto = false
        mostrarError(idInput, "Caracter no permitido en campo " + campo(idInput)); //llamamos al metodo que muestra el error
      }
    }

    return isTextoOk;
  } catch (error) {
    console.error("Ha ocurrido un error en la función isTextoOk");
  }
}

/**
 * FUNCION PARA CONOCER QUE CAMPO SE ESTA MODIFICANDO
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 * @returns nombre del campo que se esta modificando
 */
function campo(idInput) {
  try {
    let arCampos = ["Nombre", "Primer Apellido", "Segundo Apellido", "Empresa"]; //array de campos solo texto
    let campo = "";//variable para devolver el nombre del campo que se esta modificando

    switch (idInput) {
      case "nombreConf":
        campo = arCampos[0];
        break;
      case "apellido1Conf":
        campo = arCampos[1];
        break;
      case "apellido2Conf":
        campo = arCampos[2];
        break;
      case "empresaConf":
        campo = arCampos[3];
        break;
      default:
        campo = "otro campo";
    }
    return campo;

  } catch (error) {
    console.error("Ha ocurrido un error en la función campo");
  }
}

/**
 * FUNCION QUE AUMENTA O DISMINUYE LA BARRA DE PROGRESO Y REVISA SI SE HA COMPLETADO EL FORMULARIO PARA HABILITAR BOTON QR
 * @param {*} progreso recibe como parametro el progreso que llevamos hasta el momento
 * @returns retorna el valor del progreso despues de evaluar un campo
 */
function siguientePaso() {
  try {
    let contador = 0;//variable contador con el numero de campos correctos

    //1.evaluar cuantos campos con ok=1 hay en el array arCamposCompletos
    for (let i = 0; i < arCamposCompletos.length; i++) {
      if (arCamposCompletos[i] == 1) {
        contador++;
      }
    }

    //2.multiplicar contador x 12.5 (porcion de la barra a avanzar por cada campo)
    progreso = contador * 12.5;

    //3.pintar la porcion correspondiente en la barra de progreso
    barraProgreso.style.width = progreso + "%";

    //4.verificamos si se debe habilitar el boton QR en funcion del progreso que llevamos hasta el momento
    habilitarQR(progreso);

    return progreso;
  } catch (error) {
    console.error("Ha ocurrido un error en la función siguientePaso");
  }
}


/**
 * FUNCION PARA VALIDAR NUMERO DE MOVIL
 * @param {*} cadena cadena introducida el campo tipo input
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 * @returns booleano: true si el telefono es Ok, false si es Ko
 */
function isTelfOk(cadena, idInput) {
  try {
    let isTelfOk = true; //variable booleana para controlar que el movil es Ok

    cadena = cadena.trim();//quitamos espacios

    //1.controlar que la cadena de texto que recibe es un numero
    if (isNaN(cadena)) { //SiNoEsUnNumero
      mostrarError(idInput, "Debe escribir los 9 caracteres numéricos del móvil, sin espacios, puntos o guiones");
      isTelfOk = false; //el telefono no es correcto
    }

    //2.controlar que el numero de caracteres es 9
    if (isTelfOk && cadena.length != 9) {
      mostrarError(idInput, "No es un móvil válido. Debe contener 9 caracteres numéricos");
      isTelfOk = false;
    }
    //3.controlar que el primer numero empieza por 6 o 7
    if (isTelfOk && !(cadena.charAt(0) == 6 || cadena.charAt(0) == 7)) {
      mostrarError(idInput, "No es un móvil válido. Debe empezar por 6 o 7A.., siendo A=1 a 4");
      isTelfOk = false;
    }
    //4.controlar que el segundo numero este entre 1 y 4 (si empieza por 7) 6.. y 7A.., siendo A=1 a 4
    if (isTelfOk && (cadena.charAt(0) == 7 && cadena.charAt(1) > 4)) {
      mostrarError(idInput, "No es un móvil válido. Si empieza por 7 el siguiente dígito debe estar entre 1 y 4");
      isTelfOk = false;
    }
    return isTelfOk;
  } catch (error) {
    console.error("Ha ocurrido un error en la función isTelfOk");
  }
}


/**
 * FUNCION PARA VALIDAR EL EMAIL
 * @param {*} cadena cadena introducida el campo tipo input
 * @param {*} idInput id del campo input donde se ha introducido la cadena
 * @returns booleano: true si el mail es Ok, false si es Ko
 */
function isMailOk(cadena, idInput) {
  try {
    let isMailOk = true;//variable booleana para controlar que el mail es Ok
    let arroba = 0; //variable para controlar cuantas arribas existen

    cadena = cadena.trim();//quitamos espacios

    //1. longitud minima 6 caracteres x@y.zz
    if (isMailOk && cadena.length < 6) {
      mostrarError(idInput, "Revise la dirección mail. La longitud minima es de 6 caracteres y el formato debe ser x@y.zz");
      isMailOk = false;
    }

    //2. contiene arroba @
    if (isMailOk && !cadena.includes("@")) { //includes comprueba si contiene el caracter indicado ()
      mostrarError(idInput, "Revise la dirección mail. Debe contener @ y el formato debe ser x@y.zz");
      isMailOk = false;
    }
    //3. controlar que solo tiene una arroba @
    if (isMailOk) {
      for (var i = 0, j = cadena.length; i < j; i++) {
        if (cadena[i] == "@") {
          arroba++;
        }
      }
      if (arroba > 1) {
        mostrarError(idInput, "Revise la dirección mail. Contiene más de una @. El formato debe ser x@y.zz");
        isMailOk = false;
      }
    }

    //4. @ debe estar minimo entre 1 y la longitud -5
    if (isMailOk && !(cadena.indexOf("@") > 1 && cadena.indexOf("@") < (cadena.length - 4))) { //indexOf devuelve la posicion de la primera ocurrencia
      mostrarError(idInput, "Revise la dirección mail. La posición @ no es correcta. El formato debe ser x@y.zz");
      isMailOk = false;
    }

    //5.contiene un punto . 
    if (isMailOk && !cadena.includes(".")) {
      mostrarError(idInput, "Revise la dirección mail. No contiene punto. El formato debe ser x@y.zz");
      isMailOk = false;
    }

    //6. el ultimo punto debe estar despues de @ 
    if (isMailOk && !(cadena.lastIndexOf(".") > cadena.indexOf("@"))) { // si la posicion del ultimo . es menor que la de @ es incorrecto
      mostrarError(idInput, "Revise la dirección mail. Después de @ debe contener un punto. El formato debe ser x@y.zz");
      isMailOk = false;
    }

    //7. el ultimo punto . debe estar en posicion .xx o .xxx
    if (isMailOk && !(cadena.lastIndexOf(".") == (cadena.length - 3) || cadena.lastIndexOf(".") == (cadena.length - 4))) {
      mostrarError(idInput, "Revise la dirección mail. El dominio es incorrecto. El formato debe ser x@y.zz o x@y.zzz");
      isMailOk = false;
    }

    //8. empezar en letra mayuscula .toUpperCase, validando si .charCodeAt() esta comprendido 65 A y 90 Z
    if (isMailOk && (cadena.toUpperCase().charCodeAt(0) < 65 || cadena.toUpperCase().charCodeAt(0) > 90)) {
      mostrarError(idInput, "Revise la dirección mail. Debe empezar por letra. El formato debe ser x@y.zz");
      isMailOk = false;
    }

    //9. terminar en letra, ultima posicion cadena.length-1
    if (isMailOk && (cadena.toUpperCase().charCodeAt(cadena.length - 1) < 65 || cadena.toUpperCase().charCodeAt(cadena.length - 1) > 90)) {
      mostrarError(idInput, "Revise la dirección mail. Debe terminar en letra. El formato debe ser x@y.zz");
      isMailOk = false;
    }

    return isMailOk;
  } catch (error) {
    console.error("Ha ocurrido un error en la función isMailOk ");
  }
}


/**
 * FUNCION PARA MODIFICAR EL COLOR (CAMPO OPCIONAL)
 */
function cambiarColor() { //clase event
  try {
    if (colorView) {
      colorView.style.background = colorFondo.value; //el color del div de vista previa = valor seleccionado en color configuración
    }
    if (colorView) {
      colorView.style.color = colorLetra.value; //el color del div de vista previa = valor seleccionado en color configuración
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función cambiarColor ");
  }
}


/**
 * FUNCION PARA MOSTRAR ERRORES
 * @param {*} idInput id del campo input que contiene errores
 * @param {*} mensaje String del mensaje de error
 */
function mostrarError(idInput, mensaje) {
  try {
    document.getElementById(idInput).style.background = "#EEC4C9"; // cambio el color de fondo del campo con error
    mensajes.style.cssText = 'background-color: lightgrey; color: red'; // colores del campo mensaje
    mensajes.innerHTML = mensaje;
  } catch (error) {
    console.error("Ha ocurrido un error en la función mostrarError ");
  }
}


/**
 * FUNCION PARA LIMPIAR ERRORES
 * @param {*} idInput id del campo input que contiene errores
 */
function limpiarError(idInput) {
  try {
    document.getElementById(idInput).style.background = null; // limpiar el color de fondo del campo 
    mensajes.style.cssText = null; // limpiar el estilo del campo mensaje
    mensajes.innerHTML = ""; //limpiar el mensaje de error

  } catch (error) {
    console.error("Ha ocurrido un error en la función limpiarError ");
  }
}


/**
 * FUNCION PARA RESETAR TODA LA PAGINA
 */
function resetar() {
  try {
    //1.limpiar campo mensajes de error
    mensajes.style.cssText = null; // limpiar el estilo del campo mensaje
    mensajes.innerHTML = ""; //limpiar el mensaje de error
    //2.vaciar los campos de configuracion
    vaciar(nombreConf);
    vaciar(apellido1Conf);
    vaciar(apellido2Conf);
    vaciar(empresaConf);
    vaciar(cargoConf);
    vaciar(telfConf);
    vaciar(emailConf);
    vaciar(fotoConf);
    //3.valor inicial del color
    colorFondo.value = "#0000ff";
    colorLetra.value = "#ffffff";
    //4.restaurar valores iniciales en la vista previa
    nombreView.innerHTML = "nombre";
    apellido1View.innerHTML = "apellido1";
    apellido2View.innerHTML = "apellido2";
    empresaView.innerHTML = "empresa";
    cargoView.innerHTML = "cargo que ocupa";
    telfView.innerHTML = "telefono";
    emailView.innerHTML = "email@email.com";
    colorView.removeAttribute("style"); //quitar todos los estilos implementados en configuracion
    //5.cargar foto por defecto
    fotoView.src = "img/user_icon.jpg";
    //6.restaurar barra de progreso
    barraProgreso.style.width = "0%";
    progreso = 0;
    //7.limpiar el qr
    document.getElementById("imgQR").src = "";
    //8.deshabilitar boton generar tarjeta
    habilitarQR();
    //9.resetear los valores del array de campos completos
    arCamposCompletos = [0, 0, 0, 0, 0, 0, 0, 0]
    //10.limpiar el texto de mensaje "completado"
    document.getElementById("completado").innerHTML = "";
  } catch (error) {
    console.error("Ha ocurrido un error en la función resetar ");
  }
}

/**
 * FUNCION PARA VACIAR INPUTS EN CONFIGURACION
 * @param {*} campo elemento input que se debe vaciar de datos
 */
function vaciar(campo) {
  try {
    campo.style.background = null;
    campo.value = "";

  } catch (error) {
    console.error("Ha ocurrido un error en la función vaciar ");
  }
}


/**
 * FUNCION PARA GENERAR EL QR
 * genera un QR con la informacion de texto que puede ser leida con un movil,
 * copiada y guardada como una informacion de contacto
 */
function generarQR() {
  try {

    //let mensaje = "www.google.es"; //Ejemplo, podriamos crear una URL de la tarjeta para generar su QR pero tendria que estar subida a un servidor

    let mensaje = datosPersonales(); //funcion que ha concatenado toda la informacion personal en formato texto
    let qrImg = document.getElementById("imgQR"); //obtenemos id del objeto que contendra el QR

    //if el mensaje no es vacio, se genera el QR de la informacion de texto
    if (mensaje != "") {
      //URL de la API con la que generar el código QR
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${mensaje}`;
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función generarQR ");
  }
}


/**
 * FUNCION PARA CONCATENAR TODA LA INFORMACION EN TEXTO
 * @returns dato String con todos los datos personales para generar el QR
 */
function datosPersonales() {
  try {
    let datosPersonales = ""; //variable para almacenar toda la informacion personal

    //validamos si se han completado los campos obligatorios del formulario
    if (progreso = 100) {
      datosPersonales = nombreConf.value + " " + apellido1Conf.value + " " + apellido2Conf.value + "; " + cargoConf.value + " en " + empresaConf.value + "; " + telfConf.value + "; " + emailConf.value;
    }

    return datosPersonales;
  } catch (error) {
    console.error("Ha ocurrido un error en la función datosPersonales ");
  }
}

/**
 * FUNCION PARA HABILITAR BOTON GENERAR QR SI LA BARRA DE PROGRESO HA LLEGADO A 100%
 */
function habilitarQR() {
  try {
    if (progreso == 100) {
      generar.disabled = false; //si el progreso es 100 disabled = false = habilita el boton
      document.getElementById("completado").innerHTML = "Completado!"; //lanza mensaje de completado
    } else {
      generar.disabled = true; //si no es 100, disabled is true y desabilita el boton
      document.getElementById("completado").innerHTML = ""; //borra el mensaje de completado
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la función habilitarQR ");
  }
}
