//VARIABLES GLOBALES
var dni;
var botondni = document.getElementById("botondni");
var mensajedni = document.getElementById("mensajedni");

botondni.addEventListener("click", function () {
    dni = document.getElementById("dni").value.trim(); //valor marcado en el input tras pulsar el boton
    validardni(dni, mensajedni);
}); //listener sobre el boton validar

function validardni(dni, campoerroneo) {
    try {
        // 12.345.678-A
        let dniOk = true;//variable boolean para controlar que es ok o ko

        //1.revisar la longitud
        if (dni.length != 12) { //si la longitud es menor de 12 se detiene
            dniOk = false;
            error("Longitud incorrecta", campoerroneo);
        }

        //2.validar que tiene punto
        if (!dni.includes(".")) {
            dniOk = false;
            error("No contiene puntos", campoerroneo);
        }

        //3.validar que tiene un guion
        if (!dni.includes('-')) {
            dniOk = false;
            error("No contiene guion", campoerroneo);
        }

        //4.validar la posicion de los puntos y del guion
        if (!(dni.indexOf('.') == 2 && dni.lastIndexOf('.') == 6 && dni.lastIndexOf('-') == 10)) { // indexOf encuentra el primer punto y lastIndexOf el ultimo
            dniOk = false;
            error("La posición de los puntos y/o guión es incorrecta", campoerroneo);
        }

        //5.validar lo que esta antes del guion son numeros
        if (isNaN(dni.slice(0, 2)) || isNaN(dni.slice(4, 6)) || isNaN(dni.slice(8, 10))) {
            dniOk = false;
            error("El formato no es numérico", campoerroneo);
        }

        //6.validar lo que esta despues del guion es letra
        if (!((dni.toUpperCase().charCodeAt(dni.length - 1)) > 64 && (dni.toUpperCase().charCodeAt(dni.length - 1)) < 91)) {
            //convierte caracter en codigo ascii y valida si esta entre 65 A y 90 Z
            dniOk = false;
            error("El último caracter debe ser una letra", campoerroneo);
        }

        //7.si es correcto mostrar mensaje
        if (dniOk) {
            campoerroneo.style.color = "blue"; //color correcto
            campoerroneo.innerHTML = "DNI correcto" + "<br>";
        }

        return dniOk;
    }
    catch (error) {
        console.error("Ha ocurrido un error en el método validardni(): " + error);
    }
}

function error(texto, campo) {
    try {
        campo.style.color = "red"; //color correcto
        campo.innerHTML = texto + "<br>"; //concatena todos los errores  
    } catch (error) {
        console.error("Ha ocurrido un error en el método error(): " + error);
    }

}
