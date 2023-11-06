//SCRIPT PARA LEER LOS DATOS DE LOS FICHEROS XML
var contenido = document.getElementById("contenido");

var http_request = false; //inicializa variable global a false
var url = "http://localhost/dashboard/AJAX/examendaw_ajax/datos.xml";
var typeXML = "text/xml"; //MimeType

/**
 * Cuando se cargue la pagina, leer los datos del fichero json con las url de las imagenes
 */
$(document).ready(function () {
    console.log("leyendo Json...");
    leerFichero(url, typeXML);
});

/**
 * Cuando se pulse sobre el botón carga la tabla.
 */
boton.addEventListener("click", function () {
    cargarTabla();
});

function leerFichero(url, type) {

    try {
        //tipo de motor de ajax
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();//nuevo objeto XMLHttpRequest()
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType(type); //tipo fichero
                console.info("Entra overrideMimeType");
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) { }
            }
        }

        if (!http_request) {
            alert('Falla :( No es posible crear una instancia XMLHTTP');
            return false;
        }
        http_request.open('GET', url, true); //primero leerlo 
        http_request.onreadystatechange = alertContents; //luego ejecuta la verificacion del estado cada vez que este vaya cambiando
        http_request.send(); //finalmente enviarlo

    } catch (error) {
        console.error("Ha ocurrido un error en el método leerFichero(): " + error);
    }

}

/**
 * Función para verificar el estado de la petición
 */
function alertContents() {
    try {
        //si se cumplen las dos condiciones necesarias
        if (http_request.readyState == 4 && http_request.status == 200) { //comprueba que el estado sea el correcto
            console.log("Listo -> readyState: " + http_request.readyState + " & status: " + http_request.status);
            cargarTabla();
        } else {
            console.log("readyState: " + http_request.readyState + " & status: " + http_request.status);
        }

    } catch (error) {
        console.error("Ha ocurrido un error en el método alertContents(): " + error);
    }

}
/*almacenar de un xml*/
function cargarTabla() {
    let tablaDatos, datos, precio, propina, suma;

    //construir algo que esta ya en formato xml
    tablaDatos = "<table border='1'><tr><th>PRECIO</th><th>PROPINA</th><th>SUMA</th></tr>";

    //como estamos leyendo esos datos xml que estan en el servidor
    //del objeto http_request voy a coger lo que me ha enviado en formato xml, voy a buscar algo en concreto -> etiqueta
    datos = http_request.responseXML.documentElement.getElementsByTagName("producto");

    //devuelve una coleccion de datos por lo que recorremos con un for
    for (let i = 0; i < datos.length; i++) {
        tablaDatos = tablaDatos + "<tr>";
        precio = datos[i].getElementsByTagName("precio"); {
            try {
                tablaDatos = tablaDatos + "<td>" + precio[0].firstChild.nodeValue + "</td>";
            } catch (er) {
                tablaDatos = tablaDatos + "<td>Sin precio</td>";
            }
        }
        propina = datos[i].getElementsByTagName("propina"); {
            try {
                tablaDatos = tablaDatos + "<td>" + propina[0].firstChild.nodeValue + "</td>";
            } catch (er) {
                tablaDatos = tablaDatos + "<td>Sin propina</td>";
            }
        }

        //no he logrado sumar los "valores" de precios y las propinas
        suma = precio + propina;{
            try {
                tablaDatos = tablaDatos + "<td>" + suma + "</td>";
            } catch (error) {
                tablaDatos = tablaDatos + "<td>No hay datos</td>";
            }
        }

        tablaDatos = tablaDatos + "</tr>";
    }
    tablaDatos = tablaDatos + "</table>";

    //finalmente, al elemento que tengo en el formulario le inyecto el codigo html que acabo de generar
    document.getElementById("contenido").innerHTML = tablaDatos;
}


