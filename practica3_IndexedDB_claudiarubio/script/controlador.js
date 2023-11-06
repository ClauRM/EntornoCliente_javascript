//Listener sobre cada input al perder el foco
$('#fecha').focusout(function () {
    fecha = $('#fecha').val().trim(); //obtener el valor del campo (value)
    validarFecha(fecha);
});

$('#modelo').focusout(function () {
    modelo = $('#modelo').val().trim(); //obtener el valor del campo (value)
    validarTexto(modelo, 1);
});

$('#serie').focusout(function () {
    serie = $('#serie').val().trim(); //obtener el valor del campo (value)
    validarTexto(serie, 2);
});

$('#descripcion').focusout(function () {
    descripcion = $('#descripcion').val().trim(); //obtener el valor del campo (value)
    validarTexto(descripcion, 3);
});

//Listener sobre boton de registro
$('#registrar').click(function () {
    //variables para controlar que los campos estan debidamente cumplimentados
    let fechaOk, modeloOk, serieOk, descripcionOk;

    //almaceno el valor de los inputs
    fecha = $('#fecha').val().trim();
    modelo = $('#modelo').val().trim();
    serie = $('#serie').val().trim();
    descripcion = $('#descripcion').val().trim();

    //valido los campos y almaceno en variables boolean
    fechaOk = validarFecha(fecha);
    modeloOk = validarTexto(modelo, 1);
    serieOk = validarTexto(serie, 2);
    descripcionOk = validarTexto(descripcion, 3);

    if (fechaOk && modeloOk && serieOk && descripcionOk) {
        insertar(fecha, modelo, serie, descripcion);
        limpiarFormulario();
    } else {
        mostrarError(0, "Revise  el contenido de todos los campos antes de Registrar");
    }
});

//Listener sobre el boton reset para limpiar el formulario
$("#reset").click(function () {
    limpiarFormulario();
    borraErrorAnterior(0);
    borraErrorAnterior(1);
    borraErrorAnterior(2);
    borraErrorAnterior(3);
});

/**
 * Funcion para listar un objeto del almacen
 * @param {int} id Recibe un dato int que corresponde a la id del coche
 * @param {object} coche Recibe un objeto coche
 */
function aniadeListado(id, coche) {
    try {
        //asocio el id = solicitud.result al boton eliminar para construir su id
        //leo los propiedades del objeto en json para mostrarlos en una tabla
        $("#tabla").append("<tr><td>" + coche.fecha + "</td><td>" + coche.modelo + "</td><td>" + coche.serie + "</td><td>" + coche.descripcion + "</td><td><button id='eliminar" + id + "' class='btn btn-outline-primary' type='button'>Eliminar</button></td></tr></table>");

        //creo funcion asociada al boton eliminar de forma dinamica
        $("#eliminar" + id).click(function () {
            eliminar(id); //funcion que va a eliminar el objeto identificado por su id
        });
    } catch (error) {
        console.error("Ha ocurrido un error en el método aniadeListado(): " + error);
    }
}

/**
 * Funcion para crear el titulo de la tabla
 */
function tituloTabla() {
    try {
        $("#listado").append("<table id='tabla' class='table table-striped table-hover'><tr id='titulo'><td><strong>Fecha</strong></td><td><strong>Modelo</strong></td><td><strong>Serie</strong></td><td><strong>Descripción</strong></td><td><strong>Eliminar</strong></td></tr>");
    } catch (error) {
        console.error("Ha ocurrido un error en el método tituloTabla(): " + error);
    }
}

/**
 * Funcion para visualizar los datos del almacen en forma de tabla
 */
function listarTabla() {
    try {
        tituloTabla(); //crear la etiqueta html para la tabla
        consultar(); //si existe la bd, actualiza el listado
        $("#listado").append("<table>"); // finaliza la etiqueta html de la tabla
    } catch (error) {
        console.error("Ha ocurrido un error en el método listarTabla(): " + error);
    }
}