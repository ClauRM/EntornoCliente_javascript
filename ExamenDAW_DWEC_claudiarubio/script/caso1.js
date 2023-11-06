//VARIABLES GLOBALES
var matricula = document.getElementById("matricula");
var boton = document.getElementById("boton");

matricula.addEventListener("focusout", function () {
    matricula = matricula.value;
    validarMatricula(matricula);
});

function validarMatricula(matricula) {
    let matriculaOk = true; //variable para evaluar si es ok

    //1.que tenga longitud correcta 8 caracteres
    if (matricula.length != 8 && matriculaOk) {
        matriculaOk = false;
    }

    //2.tiene un guion y esta en posicion correcta
    if (matriculaOk && !matricula.includes('-')) {
        matriculaOk = false;
    } else {
        //separar en array
        //3.primeros caracteres son numeros
        if(matriculaOk && isNaN(matricula.slice(0, 3))){
            matriculaOk = false;
        }
        //4.ultimos caracteres son letras //charCodeAt codigo ascii y valida si esta entre 65 A y 90 Z

        toUpperCase().charCodeAt(dni.length - 1)
        if(matriculaOk && !isNaN(matricula.slice(5,8))){
            matriculaOk=false;
        }
    }

    //5.si es correcto habilitar boton
    if(matriculaOk){
        boton.removeAttribute("disabled");
    }


}