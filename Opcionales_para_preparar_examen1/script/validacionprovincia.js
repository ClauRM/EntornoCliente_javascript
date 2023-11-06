//VARIABLES GLOBALES
var provincia;
var botonprovincia = document.getElementById("botonprovincia");
var mensajeprovincia = document.getElementById("mensajeprovincia");

botonprovincia.addEventListener("click", function () {
    provincia = document.getElementById("provincia").value.trim(); //valor marcado en el input tras pulsar el boton
    validarprovincia(provincia, mensajeprovincia);
}); //listener sobre el boton validar

function validarprovincia(provincia, campoerroneo) {
    try {
        // Madrid
        let provinciaOk = true;//variable boolean para controlar que es ok o ko
        let arrayProvincias = ["Madrid", "Segovia", "Toledo", "Guadalajara", "Valencia", "Alicante"]; //listado de provincias
        let i = 0; //variable de avance por el array
        let localizada = false;

        //1.comparar sin tener en cuenta mayusculas - minusculas
        do {
            if (provincia.toLocaleUpperCase() == arrayProvincias[i].toLocaleUpperCase()) {
                localizada = true;
            } else {
                i++;
            }
        } while (!localizada && i < arrayProvincias.length)

        if (!localizada) {
            provinciaOk = false;
            error("La provincia no se encuentra en el listado", campoerroneo);
        }

        if (provinciaOk) {
            campoerroneo.style.color = "blue"; //color correcto
            campoerroneo.innerHTML = "PROVINCIA localizada" + "<br>";
        }

        return provinciaOk;
    } catch (error) {
        console.error("Ha ocurrido un error en el método validarprovincia(): " + error);
    }
}
