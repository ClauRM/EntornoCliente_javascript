//VARIABLES GLOBALES
var iban;
var botoniban = document.getElementById("botoniban");
var mensajeiban = document.getElementById("mensajeiban");

botoniban.addEventListener("click", function () {
    iban = document.getElementById("iban").value.trim(); //valor marcado en el input tras pulsar el boton
    validariban(iban, mensajeiban);
}); //listener sobre el boton validar

function validariban(iban, campoerroneo) {
    try {
        //AA12 1234 4567 12 12345678
        let arrayIban; //separar el iban por espacios y almacenar posiciones en array
        let ibanOk = true; //variable boolean para controlar que es ok o ko
        let letra1, letra2;

        //1.separar por espacios en un array
        arrayIban = iban.split(" ");

        //2.comprobar que el arrayiban contiene longitud 5
        if (arrayIban.length != 5) {
            ibanOk = false;
            error("No cumple el formato de espacios", campoerroneo);
        }

        //3. validar la longitud de los campos del array
        if (arrayIban[0].length != 4 || arrayIban[1].length != 4 || arrayIban[2].length != 4 || arrayIban[3].length != 2 || arrayIban[4].length != 8) {
            ibanOk = false;
            error("La longitud de los campos del IBAN no es correcta", campoerroneo);
        }

        //4. validar primer campo: dos letras + dos numeros
        if (arrayIban[0].length == 4) {
            letra1 = arrayIban[0].slice(0, 2).toUpperCase().charCodeAt(0); // almacenamos caracter1
            letra2 = arrayIban[0].slice(0, 2).toUpperCase().charCodeAt(1); // almacenamos caracter2

            //revisar letras ascii entre 65 A y 90 Z y Revisar numeros isNaN = False si es numero
            if (!((letra1 > 64 && letra1 < 91) && (letra2 > 64 && letra2 < 91)) || (isNaN(arrayIban[0].slice(2, 4)))) {
                ibanOk = false;
                error("Error en formato primer campo AA##", campoerroneo);
            }
        }

        //5. validar que el resto de campos son/no son numéricos
        if (isNaN(arrayIban[1]) || isNaN(arrayIban[2]) || isNaN(arrayIban[3]) || isNaN(arrayIban[4])) {
            ibanOk = false;
            error("El resto de campos debe ser numérico", campoerroneo);
        }

        //6.si es correcto mostrar mensaje
        if (ibanOk) {
            campoerroneo.style.color = "blue"; //color correcto
            campoerroneo.innerHTML = "IBAN correcto" + "<br>";
        }

        return ibanOk;
    } catch (error) {
        console.error("Ha ocurrido un error en el método validariban(): " + error);
    }

}