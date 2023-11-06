//atrapar elementos en variables
var palabra;
var boton = document.getElementById("boton");
var allLista = document.querySelector('#allLista');

//cuando se pulse sobre el boton crear lista
boton.addEventListener("click", crearLista);

function crearLista() {
    try {
        palabra = document.getElementById("palabra").value;//capturamos el valor capturado en el input
        let caracter = 0; //variable para almacenar un caracter de la cadena
        let i = 0; //variable para revisar cada caracter de la cadena
        let lista; //elemento lista

        // limpiamos la cadena de espacios
        palabra = palabra.trim();

        //mientras que i sea menor que la longitud de la cadena
        while (i < palabra.length) {

            caracter = palabra.charAt(i); //almacenamos la posicion i de la cadena en la variable caracter a revisar
            //a cada vuelta creamos un nuevo elemento lista
            lista = document.createElement('li');

            //cogemos el caracter de la posicion i y lo introducimos en la lista
            lista.textContent = caracter;
            //lo adicionamos a toda la lista
            allLista.appendChild(lista); //lo adicionamos a toda la lista
            i++;//aumentamos contador para leer el sigueinte caracter
        }
    } catch (error) {
        console.error("Ha ocurrido un error en la función crearLista.")
    }

}