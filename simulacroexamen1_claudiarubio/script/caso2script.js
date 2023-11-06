//atrapar elementos en variables
var email;
var boton = document.getElementById("boton");
var resultado = document.getElementById("resultado");
var final;

//ponemos listener sobre el boton para validar el email
boton.addEventListener("click", validaEmail);

function validaEmail() {
    try {
        //capturamos el valor marcado en el campo
        email = document.getElementById("email").value;
        var arroba = 0; //numero de arrobas
        var posicionArroba; //posicion de la arroba
        var final; //array para separar el email por puntos
        var finalPermitido = ["com", "es", "net", "org"];
        var contar = 0;

        //al iniciar limpiar cualquier mensaje de errores.
        resultado.innerHTML = "";

        //• Debe tener entre 9 y 50 caracteres.
        if (email.length < 9 || email.length > 50) {
            resultado.innerHTML += "La longitud debe estar entre 9 y 50 caracteres. ";
        }
        //• Debe empezar por una letra.
        if (email.toUpperCase().charCodeAt(0) < 65 || email.toUpperCase().charCodeAt(0) > 90) {
            resultado.innerHTML += "Debe empezar por una letra. ";
        }
        //• Debe tener una única @. recorremos la cadena con un for para leer cada posicion charAt(i)
        for (let i = 0; i < email.length; i++) {
            if (email.charAt(i) == "@") {
                arroba++;
                posicionArroba = i;
            }
        }

        if (arroba > 1) {
            resultado.innerHTML += "Tiene más de una @. ";
        }

        //Su posición debe estar al menos a 3 caracteres de distancia del inicio y al menos a 5 caracteres del final.
        if (posicionArroba < 3 || posicionArroba > (email.length - 5)) {
            resultado.innerHTML += "La posición de la @ no es la correcta. ";
        }

        //• Debe terminar en .com, o .es, o.net o .org. 
        final = email.split(".");//separamos el email por puntos

        for (let i = 0; i < finalPermitido.length; i++) {
            if (finalPermitido[i] == final[final.length - 1]) {
                contar++;
            }
        }
        if (contar < 1) {
            resultado.innerHTML += "La terminación no es correcta. ";
        }
    } catch (error) {
        console.error("Ha ocurrido un error en la función validaEmail");
    }

    //falto programar que ocurre si es correcto
}