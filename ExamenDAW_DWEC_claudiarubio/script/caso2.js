//VARIABLES GLOBALES
;
var calculo = document.getElementById("calculo");

setInterval(function () { //funcion que esta cambiando cada 1segundo

    let resultado = 0; //variable para sumar las mayusculas dentro del input
    let arrayMayusculas = [];
    let mayusculas = document.getElementById("mayusculas").value;

    //separar en array
    arrayMayusculas = mayusculas.split("");

    //recorrer el texto y verificar las que son mayusculas entre 65 A y 90 Z
    for (let i = 0; i < arrayMayusculas.length; i++) {
        if (arrayMayusculas.charCodeAt(i) > 64 || arrayMayusculas.charCodeAt(i) < 91) {
            resultado++;
        }    }

    calculo.innerHTML = resultado;

}, 500); // 1000 = 1 segundo