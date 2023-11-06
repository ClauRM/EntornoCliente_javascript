//VARIABLES GLOBALES
var fecha;
var botonfecha = document.getElementById("botonfecha");
var mensajefecha = document.getElementById("mensajefecha");

var fecha = document.getElementById("fecha").value.trim(); //valor del dni tras pulsar el boton de validar

botonfecha.addEventListener("click", function () {
    fecha = document.getElementById("fecha").value.trim(); //valor marcado en el input tras pulsar el boton
    validarfecha(fecha, mensajefecha);
}); //listener sobre el boton validar

function validarfecha(fecha, campoerroneo) {
    try {
        // 12/12/2023
        let fechaOk = true; //variable boolean para controlar que es ok o ko
        let arrayFecha = fecha.split("/"); //almacenar fecha separada por barras
        let dia, mes, anio;

        //1.validar la longitud dd/mm/aaaa 10 caracteres
        if (fecha.length != 10) {
            fechaOk = false;
            error("La longitud de la fecha no es correcta", campoerroneo);
        }

        //2.validar separadores // 2 
        if (!fecha.includes("/")) {
            fechaOk = false;
            error("La fecha no contiene barras", campoerroneo);
        }

        //3.comprobar que el arrayiban contiene longitud 3
        if (arrayFecha.length != 3) {
            fechaOk = false;
            error("No cumple el formato dd/mm/aaaa", campoerroneo);
        } else {
            dia = arrayFecha[0]; //dia
            mes = arrayFecha[1]; //mes
            anio = arrayFecha[2]; //anio

            //4.validar la longitud de cada trozo de la fecha con el split (array)
            if (fechaOk && (dia.length != 2 || mes.length != 2 || anio.length != 4)) {
                error("La posición de los separadores no es correcta", campoerroneo);
                fechaOk = false;
            }

            //5.validar que sean numeros
            if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
                error("La fecha debe ser numérica", campoerroneo);
                fechaOk = false;
            } else {
                // si son numeros, parsearlos para seguir evaluando
                dia = parseInt(dia); //parsear a int la fecha
                mes = parseInt(mes); //mes
                anio = parseInt(anio); //anio

                //6.validar que el dia sea correcto
                if (dia < 1 || dia > 31) {
                    error("El día no es correcto", campoerroneo);
                    fechaOk = false;
                }

                //7.validar el mes sea correcto
                if (mes < 1 || mes > 12) {
                    error("El mes no es correcto", campoerroneo);
                    fechaOk = false;
                }

                //8.validar anio > 1000 
                if (anio < 1000) {
                    error("El año no es correcto. Debe ser mayor de 1000", campoerroneo);
                    fechaOk = false;
                }

                //9.coherencia de la fecha
                if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
                    error("La fecha no tiene coherencia día/mes", campoerroneo);
                    fechaOk = false;
                }

                if (fechaOk && ((mes == 2) && dia > 29)) {
                    error("La fecha no tiene coherencia mes febrero", campoerroneo);
                    fechaOk = false;
                }
            }
        }

        //10.si es correcto mostrar mensaje
        if (fechaOk) {
            campoerroneo.style.color = "blue"; //color correcto
            campoerroneo.innerHTML = "FORMATO FECHA correcto" + "<br>";
        }

        return fechaOk;
    } catch (error) {
        console.error("Ha ocurrido un error en el método validarfecha(): " + error);
    }
}