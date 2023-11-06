
$(document).ready(function () {
    var arrayPalos = ["picas", "corazones", "treboles", "rombos"];
    var arrayNumeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    var listapalos = document.getElementById("listapalos");
    var listacartas = document.getElementById("listacartas");

    for (let i = 0; i < arrayPalos.length; i++) {
        crearLista(arrayPalos[i], listapalos, "option");
    }

    for (let i = 0; i < arrayNumeros.length; i++) {
        crearLista(arrayNumeros[i], listacartas, "option");
    }

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