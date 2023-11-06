//atrapar elementos en variables
var fecha1;
var fecha2;
var resultado = document.getElementById("resultado");

//ponemos listener sobre el boton para validar fechas
boton.addEventListener("click", validaFechas);

function validaFechas() {
    try {
        fecha1 = document.getElementById("fecha1").value;
        fecha2 = document.getElementById("fecha2").value;

        let arrayFecha1 = fecha1.split("/");
        let arrayFecha2 = fecha2.split("/");

        //limpiar los mensajes al iniciar
        resultado.innerHTML = "";

        //Validar que las fechas sean numeros
        if (isNaN(arrayFecha1[0]) || isNaN(arrayFecha1[1]) || isNaN(arrayFecha1[2])) {
            resultado.innerHTML += "La fecha 1 no es numérica. ";
        }

        if (isNaN(arrayFecha2[0]) || isNaN(arrayFecha2[1]) || isNaN(arrayFecha2[2])) {
            resultado.innerHTML += "La fecha 2 no es numérica. ";
        }

        //Validar que la posicion 0 de los arrays este entre 0 y 31 días
        if ((arrayFecha1[0] < 1 || arrayFecha1[0] > 31) || (arrayFecha2[0] < 1 || arrayFecha2[0] > 31)) {
            resultado.innerHTML += "El día de alguna de las fechas no es correcto. ";
        }

        //Validar que la posicion 1 de los arrays este entre 0 y 12 meses
        if ((arrayFecha1[1] < 1 || arrayFecha1[1] > 12) || (arrayFecha2[1] < 1 || arrayFecha2[1] > 12)) {
            resultado.innerHTML += "El mes de alguna de las fechas no es correcto. ";
        }

        //Validar que la posicion 2 sea 2022 (anio)
        if (arrayFecha1[2] != "2022") {
            resultado.innerHTML += "El año debe ser el actual. ";
        }

        //validar que la primera sea menor que la segunda
        if (arrayFecha1[1] > arrayFecha2[1]) { //si el mes de la primera es mayor que la segunda esta erroneo
            resultado.innerHTML += "La primera fecha debe ser menor a la segunda. ";
        } else if (arrayFecha1[1] == arrayFecha2[1]) {//si los meses son iguales se evalua la fecha
            if (arrayFecha1[0] > arrayFecha2[0]) { //si el dia de la primera es mayor que la segunda esta erroneo
                resultado.innerHTML += "La primera fecha debe ser menor a la segunda. ";
            }
        }

        //falto validar cuando sean correctas

        
    } catch (error) {
        console.error("Ha ocurrido un error en la función validaFechas");
    }
}
