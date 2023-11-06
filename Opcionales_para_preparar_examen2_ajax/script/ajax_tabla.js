//VARIABLES GLOBALES
var boton = document.getElementById("boton"); //boton de carga

//NOTA, los datos url, nombre y descripcion deben estar en el mismo orden en ambos ficheros
var urlJSON = "http://localhost/dashboard/AJAX/Opcionales_para_preparar_examen2_ajax/file/heroes.json";
var typeJSON = "application/json"; //MimeType

/**
 * Cuando se cargue la pagina, leer los datos del fichero json con las url de las imagenes
 */
$(document).ready(function () {
    console.log("leyendo Json...");
    leerFichero(urlJSON, typeJSON);
});

/**
 * Cuando se pulse sobre el botón carga las imagenes. Después de cargarlas, oculta el botón
 */
boton.addEventListener("click", function () {
    cargarTabla();
})

function cargarTabla() {
    let tablaDatos;
    let listado = document.getElementById("listado");

   
    //construyo el elemento la tabla
    tablaDatos = "<table border='1'><tr><th>NOMBRES</th></tr>";


    //devuelve una coleccion de datos por lo que recorremos con un for
    for (let i = 0; i < arrayHeroes.length; i++) {
        tablaDatos = tablaDatos + "<tr><td>";
        tablaDatos = tablaDatos + arrayHeroes[i];
        tablaDatos = tablaDatos + "</tr></td>";
    }
    tablaDatos = tablaDatos + "</table>";

    //aniadimos la tabla al div listado
    listado.innerHTML = tablaDatos;
    
}