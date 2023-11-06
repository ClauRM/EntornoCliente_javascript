//VARIABLES GLOBALES
var inputs = $('form input');//array de inputs
const MIN_CARACTERES = 4; //longitud minima de caracteres en campo String
const MAX_CARACTERES = 20; // longitud maxima de caracteres en campo String

var fecha, modelo, serie, descripcion;

/**
 * Funcion para validar la fecha
 * @param {String} dato Recibe un dato String con la informacion tecleada en el campo
 * @returns Retorna un dato boolean con el resultado true o false de las validaciones
 */
function validarFecha(dato) {
    try {
        let fechaOk = true; //variable booleana para controlar que el campo es Ok

        let dia = dato.split("/")[0]; //dia
        let mes = dato.split("/")[1]; //mes
        let anio = dato.split("/")[2]; //anio

        //1.validar la longitud dd/mm/aaaa 7 caracteres
        if (fechaOk && (dato.length != 10)) {
            mostrarError(0, "La longitud de la fecha no es correcta. Revise formato dd/mm/aaaa");
            fechaOk = false; //cambia el valor booleano para no seguir validando  
        }

        //2.validar separadores // 2
        if (fechaOk && !dato.includes("/")) {
            mostrarError(0, "No se han incluido separadores en la fecha. Revise formato dd/mm/aaaa");
            fechaOk = false;
        }

        //3.validar la longitud de cada trozo de la fecha con el split (array)
        if (fechaOk && (dia.length != 2 || mes.length != 2 || anio.length != 4)) {
            mostrarError(0, "La posición de los separadores no es correcta. Revise formato dd/mm/aaaa");
            fechaOk = false;
        }

        //4.validar que sean numeros
        if (fechaOk && (isNaN(dia) || isNaN(mes) || isNaN(anio))) {
            mostrarError(0, "La fecha debe ser numérica. Revise formato dd/mm/aaaa");
            fechaOk = false;
        } else {
            // si son numeros, parsearlos para seguir evaluando
            dia = parseInt(dia); //parsear a int la fecha
            mes = parseInt(mes); //mes
            anio = parseInt(anio); //anio

            //5.validar que el dia sea correcto
            if (fechaOk && (dia < 1 || dia > 31)) {
                mostrarError(0, "El día no es correcto. Teclee una fecha válida");
                fechaOk = false;
            }

            //6.validar el mes sea correcto
            if (fechaOk && (mes < 1 || mes > 12)) {
                mostrarError(0, "El mes no es correcto. Teclee una fecha válida");
                fechaOk = false;
            }

            //7.validar anio > 1968 
            if (fechaOk && (anio < 1968)) {
                mostrarError(0, "El año no es correcto. El primer coche HotWheel apareció en el año 1968");
                fechaOk = false;
            }

            //8.coherencia de la fecha
            if (fechaOk && ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30)) {
                mostrarError(0, "Revise la coherencia en la fecha. Teclee una fecha válida");
                fechaOk = false;
            }

            if (fechaOk && ((mes == 2) && dia > 29)) {
                mostrarError(0, "Revise el mes y el día. Teclee una fecha válida");
                fechaOk = false;
            }
        }

        //9.Al terminar todas las validaciones y si el resultado es Ok, se borra cualquier error que se haya mostrado anteriormente 
        if (fechaOk) {
            borraErrorAnterior(0);
        }
        return fechaOk;
    } catch (error) {
        console.error("Ha ocurrido un error en el método validarFecha(): " + error);
    }
}

/**
 * Funcion para validar que el dato introducido cumple las especificaciones. Se permiten numeros y caracteres especiales
 * @param {String} texto Recibe dato String introducido en el input
 * @param {Int} posicionInput Recibe dato int con la posicion que ocupa el input dentro del array de inputs
 * @returns Retorna un dato boolean con el resultado true o false de las validaciones
 */
function validarTexto(texto, posicionInput) {
    try {
        let textoOk = true; //variable booleana para controlar que el campo es Ok

        if (!((texto.length >= MIN_CARACTERES) && (texto.length <= MAX_CARACTERES))) {
            mostrarError(posicionInput, "El campo debe tener una longitud entre " + MIN_CARACTERES + " y " + MAX_CARACTERES + " caracteres");
            textoOk = false;
        }

        //Si el resultado es Ok, se borra cualquier error que se haya mostrado anteriormente
        if (textoOk) {
            borraErrorAnterior(posicionInput);
        }
        return textoOk;
    } catch (error) {
        console.error("Ha ocurrido un error en el método validarTexto(): " + error);
    }
}

/**
 * Funcion que borra cualquier error anterior y muestra un mensaje con el ultimo error
 * @param {int} posicionInput Recibe dato int con la posicion que ocupa el input dentro del array de inputs
 * @param {String} mensaje Recibe dato String con un mensaje de error
 */
function mostrarError(posicionInput, mensaje) {
    try {
        borraErrorAnterior(posicionInput); //limpia los errores anteriores
        error(posicionInput, mensaje); //muestra mensaje de error
    } catch (error) {
        console.error("Ha ocurrido un error en el método mostrarError(): " + error);
    }
}

/**
 * Funcion que muestra el mensaje del ultimo error
 * @param {int} posicionInput Recibe dato int con la posicion que ocupa el input dentro del array de inputs
 * @param {String} mensaje Recibe dato String con un mensaje de error
 */
function error(posicionInput, mensaje) {
    try {
        inputs[posicionInput].style.background = "#EEC4C9"; // cambio el color de fondo del campo con error;
        $("#oculto").removeClass("d-none"); //muestro campo oculto
        $("#mensajes").append(mensaje); //aniado el ultimo mensaje error  
    } catch (error) {
        console.error("Ha ocurrido un error en el método error(): " + error);
    }
}

/**
 * Funcion para borrar error anterior
 * @param {int} posicionInput Recibe dato int con la posicion que ocupa el input dentro del array de inputs
 */
function borraErrorAnterior(posicionInput) {
    try {
        inputs[posicionInput].style.background = null; // quito el color de fondo del campo;
        $("#oculto").addClass("d-none"); //oculto campo div mensajes
        $("#mensajes").empty(); //borro el ultimo mensaje error   
    } catch (error) {
        console.error("Ha ocurrido un error en el método borraErrorAnterior(): " + error);
    }
}

/**
 * Funcion para limpiar todos los campos del formulario
 */
function limpiarFormulario() {
    try {
        $("#fecha").val("");
        $("#modelo").val("");
        $("#serie").val("");
        $("#descripcion").val("");
    } catch (error) {
        console.error("Ha ocurrido un error en el método limpiarFormulario(): " + error);
    }
}