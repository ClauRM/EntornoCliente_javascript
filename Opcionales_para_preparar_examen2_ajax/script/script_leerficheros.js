//SCRIPT PARA LEER LOS DATOS DE LOS FICHEROS JSON Y XML

var http_request = false; //inicializa variable global a false
var arrayHeroes; //array de objetos

/**
 * Función leerFichero con dos parámetros de entrada. Lee fichero json y xml
 * @param {*} url Dato String con la ruta del fichero que debe ser leído
 * @param {*} type Dato String con el MimeType requerido por el método overrideMimeType de la clase XMLHttpRequest en función del tipo de fichero
 * @returns response, cuando el fichero haya sido leído correctamente
 */
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
            almacenar();
        } else {
            console.log("readyState: " + http_request.readyState + " & status: " + http_request.status);
        }

    } catch (error) {
        console.error("Ha ocurrido un error en el método alertContents(): " + error);
    }

}

/**
 * Función almacenar. Lee la respuesta de la petición y llama al método almacenar dependiendo de si es un json o un xml
 */
function almacenar() {
    try {
        //en funcion del la url leida ejecuta un metodo de almacenamiento de datos
        switch (http_request.responseURL) {//la propiedad responseURL contiene la url del fichero que se esta leyendo
            case urlJSON:
                //JSON.parse(this.responseText); //hay que parsearlo para poderlo interpretar como hmtl, contiene un array de objetos
                almacenaJson(JSON.parse(http_request.responseText)); //pasamos los datos leidos a la funcion que almacenara en array su informacion
                break;
            case urlXML:
                almacenaXML();
                break;
            default:
                console.log("Error. URL de entrada no definida o tipo de fichero no admitido.");
                break;
        }

    } catch (error) {
        console.error("Ha ocurrido un error en el método almacenar(): " + error);
    }
}

/**
 * Función para leer los datos del fichero tipo json y almacenarlos en array global
 * @param {*} datosJSON Objeto HTML con la colección de datos del fichero json
 */
function almacenaJson(datosJSON) {
    try {
        //"members" es el nombre del grupo de objetos a leer del fichero
        //"name" es el nombre del objeto contenido dentro del grupo

        arrayHeroes = [];//array de objetos leido contenidos en el json

        //recorremos el objeto con un for para almanacenar todas los objetos en un array
        for (let i = 0; i < datosJSON.members.length; i++) {
            objeto = datosJSON.members[i].name; //esta parseado por lo que unicamente accedemos al contenido de la etiqueta "name" de la posicion i 
            arrayHeroes.push(objeto); //aniade la el objeto al array
        }
        return arrayHeroes;

    } catch (error) {
        console.error("Ha ocurrido un error en el método almacenaJson(): " + error);
    }
}

/**
 * METODO PARA MODIFICAR EN FUNCION DEL UN FICHERO XML
 * Función para leer los datos del fichero tipo xml y almacenarlos en arrays globales
 */
function almacenaXML() {
    try {
        let datos = [];//array local para almacenar la coleccion de datos del fichero xml
        let dato; //variable para almacenar el dato que se esta leyendo en un momento determinado con sus propiedades

        //tener en cuenta que deben ser globales para que tengan ambito en todo el script
        let arrayNombres = []; //array global para almacenar la propiedad nombre del xml 
        let arrayDescripciones = []; //array global para almacenar la propiedad descripcion del xml

        //como estamos leyendo esos datos xml que estan en el servidor
        //del objeto http_request voy a coger lo que me ha enviado en formato xml, voy a buscar algo en concreto -> etiqueta
        datos = http_request.responseXML.documentElement.getElementsByTagName("coche"); //almaceno los datos en coleccion HTMLCollection de objetos tipo coche

        //devuelve una coleccion de datos por lo que recorremos con un for
        for (let i = 0; i < datos.length; i++) {
            //leemos la propiedad nombre y almacenamos en su array
            //accedo a la coleccion HTMLCollection definiendo una etiqueta -> nombre, y luego tomo su valor firstChild.nodeValue;
            dato = datos[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
            //http_request.responseXML.documentElement.getElementsByTagName("coche")[0].getElementsByTagName("nombre")[0].firstChild.nodeValue
            //almaceno el valor leido en el array correspondiente
            arrayNombres.push(dato);
            //idem leemos la propiedad descripcion y almacenamos en su array
            dato = datos[i].getElementsByTagName("descripcion")[0].firstChild.nodeValue;;
            arrayDescripciones.push(dato);
        }

    } catch (error) {
        console.error("Ha ocurrido un error en el método almacenaXML(): " + error);
    }
}