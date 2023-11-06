//VARIABLES GLOBALES
var input = document.getElementById("texto"); //variable que captura el objeto con id senialado
var palabra;
var botonlistar = document.getElementById("aniadirpalabra");
var listadesplegable = document.getElementById("listadesplegable");
var listadopalabra = document.getElementById("listadopalabra");

//listener que se dispara cuando se pulse una tecla sobre el input
input.addEventListener("keypress", function (e) {
    let texto = input.value.trim();//capturamos el valor tecleado en el input
    let tecla = e.key; //tecla que hace saltar el evento

    if (tecla == "Enter") { //se evalua si la tecla pulsada es el intro
        crearLista(texto, listadesplegable, "option");
        input.value = "";//limpiar input
    }
});

//listener sobre el boton listar
botonlistar.addEventListener("click", function () {
    let arrayLetras = [];
    let i = 0; //posicion para recorrer array

    palabra = document.getElementById("palabra").value.trim();//capturamos el valor tecleado en el input

    //separamos la palabra por letras en un array
    arrayLetras = palabra.split("");

    //crear el listado con cada letra de la palabra
    do {
        crearLista(arrayLetras[i], listadopalabra, "li");
        i++;
    } while (i < arrayLetras.length);
});

//funcion que crea una lista en funcion de un texto, una ubicacion en el HTML y una etiqueta HTML
function crearLista(texto, lugar, etiqueta) {
    try {
        let lista; //elemento lista

        lista = document.createElement(etiqueta); //creo un elemento
        lista.style.color = "blue";
        lista.textContent = texto; //introduzco texto en la lista
        lugar.appendChild(lista); //agrego la lista al lugar (listado)
    }
    catch (error) {
        console.error("Ha ocurrido un error en la función crearLista: " + error);
    }
}