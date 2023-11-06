//VARIABLES GLOBALES
var fecha1, fecha2;
var botondosfechas = document.getElementById("botondosfechas");
var mensajedosfechas = document.getElementById("mensajedosfechas");

botondosfechas.addEventListener("click", function () {
    fecha1 = document.getElementById("fecha1").value.trim(); //valor marcado en el input tras pulsar el boton
    fecha2 = document.getElementById("fecha2").value.trim(); //valor marcado en el input tras pulsar el boton
    validardosfechas(fecha1, fecha2, mensajedosfechas);
}); //listener sobre el boton validar

function validardosfechas(fecha1, fecha2, campoerroneo) {
    try {
        // 12/12/2023
        let fechasOk = true; //variable boolean para controlar que es ok o ko
        let arrayFecha1 = fecha1.split("/"); //almacenar fecha separada por barras
        let arrayFecha2 = fecha2.split("/"); //almacenar fecha separada por barras

        //1.validar las fechas por separado
        if (!(validarfecha(fecha1, campoerroneo) && validarfecha(fecha2, campoerroneo))) {
            fechasOk = false;
            error("Algún dato no cumple el formato de fecha", campoerroneo);

            //2.comprobar que son del anio actual
        } else if (parseInt(arrayFecha1[2]) != 2023 || parseInt(arrayFecha2[2]) != 2023) {
            fechasOk = false;
            error("Deben ser del año actual", campoerroneo);

            //3.comprobar el mes de la primera con respecto a la segunda
        } else if (parseInt(arrayFecha1[1]) > parseInt(arrayFecha2[1])) {
            fechasOk = false;
            error("El mes de la primera debe ser inferior", campoerroneo);

            //4.comprobar el dia de la primera con respecto a la segunda
        } else if (parseInt(arrayFecha1[0]) > parseInt(arrayFecha2[0])) {
            fechasOk = false;
            error("El día de la primera debe ser inferior", campoerroneo);

            //5.comprobar si son iguales
        } else if ((parseInt(arrayFecha1[0]) == parseInt(arrayFecha2[0])) && (parseInt(arrayFecha1[1]) == parseInt(arrayFecha2[1])) && (parseInt(arrayFecha1[2]) == parseInt(arrayFecha2[2]))) {
            fechasOk = false;
            error("Las fechas son iguales", campoerroneo);
        }

        //6.si es correcto mostrar mensaje
        if (fechasOk) {
            campoerroneo.style.color = "blue"; //color correcto
            campoerroneo.innerHTML = "PRIMERA < SEGUNDA correcto" + "<br>";
        }

        return fechasOk;
    } catch (error) {
        console.error("Ha ocurrido un error en el método validardosfechas(): " + error);
    }

}