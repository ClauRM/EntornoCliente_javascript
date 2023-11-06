var color = document.getElementById("color");
var boton = document.getElementById("boton");
var inputs = document.getElementsByTagName("input"); //array de inputs
var imagen = document.getElementById("imagen");


setInterval(function () { //funcion que esta cambiando el color de fondo cada 1segundo

    let rojo = Math.floor(Math.random() * 256); //random rgb hacia la unidad
    let verde = Math.floor(Math.random() * 256);
    let azul = Math.floor(Math.random() * 256);

    color.style = "background-color: rgb(" + rojo + "," + verde + "," + azul + ");" //cambia el color de fondo al azar entre el rango

}, 1000); // 1000 = 1 segundo

//listener sobre el boton "resaltar"
boton.addEventListener("click", function () {
    let subrayado = document.getElementsByTagName("u"); //seleccionar etiquetas cursivas en array

    for (let i = 0; i < subrayado.length; i++) {//recorrer array
        subrayado[i].style.fontWeight = "900"; //aplicar el stilo de negrita
    }
});

//bucle for para aniadir los listener a los inputs
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", function () { //keyup cuando ya se ha soltado la tecla
        validarDato(inputs[i], i);
    });
}

/**
 * Funcion que valida cuantos caracteres se han marcado en el input
 * @param {*} input Recibe el objeto input
 * @param {*} posicion Recibe la posicion del input dentro del array
 */
function validarDato(input, posicion) {
    let texto = input.value.trim();
    let labels = document.getElementsByTagName("label"); //array de labels

    if (texto.length > 2) { //cuando la longitud del texto en el campo sea mayor de 2
        labels[posicion].style.color = "black"; //cambia el color del label correspondiente
    } else {
        labels[posicion].style.color = "red"; //si es menor, cambia de color
    }
}

//listener sobre la imagen
imagen.addEventListener("click", function () {
    eliminar(imagen); //funcion ocultar imagen
});

function eliminar(imagen) {
    imagen.parentNode.removeChild(imagen);; //eliminamos
    document.getElementById("caso4").innerHTML += "<br><br><p>Pues sí, si se podía...</p>";
}