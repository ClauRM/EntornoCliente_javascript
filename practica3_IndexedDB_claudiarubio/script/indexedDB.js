const DB_NAME = "hotwheels"; //nombre de la db
const DB_VERSION = 1; //version de la db

var db;
//1.Abrir la base de datos (nombre,version instalada) 
var solicitud = indexedDB.open(DB_NAME, DB_VERSION); //se realiza la solicitud de abrir la db
console.log("Abriendo bd...");

//2.Listener. Se dispara si el cliente no tiene la base de datos. Crea el esquema de la base de datos
solicitud.onupgradeneeded = function (e) {
    console.log("Ejecutando solicitud.onupgradeneeded...");
    let db = solicitud.result;
    let almacen; //trabajar con la base de datos usando el objeto almacen

    //Se evalua la version de db. Si es 0: no hay base de datos instalada
    if (e.oldVersion < 1) {//Si es menor de 1, se creara la db
        if (!db.objectStoreNames.contains("coches")) { //si no hay un almacen de coches 

            almacen = db.createObjectStore("coches", { keyPath: "id", autoIncrement: true }); //createObjectStore crea el almacen con id

            //createIndex crear un indice: true no permite valores duplicados
            //definir los elementos de datos que contendra el almacen
            almacen.createIndex("fecha", "fecha", { unique: false });
            almacen.createIndex("modelo", "modelo", { unique: false });
            almacen.createIndex("serie", "serie", { unique: false });
            almacen.createIndex("descripcion", "descripcion", { unique: false });

            console.info("Creado almacen");
        } else {
            console.info("Ya existe almacen")
        }
    } else {
        console.log("Intenta acceder a una versión superior");
    }
};

//Proceso asincrono si se ha ejecutado correctamente
solicitud.onsuccess = function () {
    db = solicitud.result; // trabaja con la base de datos usando el objeto db, resultado de abrir la db
    console.info("Tenemos bd: indexedDB.open ok");
    listarTabla(); //revisa si hay datos y crea una tabla
};

//Proceso asincrono si se ha producido algun error
solicitud.onerror = function () {
    console.error("Error indexedDB.open: ", solicitud.error);
};

//4.Hacer una transaccion: insertar, consultar, eliminar

/**
 * Funcion que insertar datos en el almacen
 * @param {String} datoFecha Recibe dato String despues de la validacion del campo fecha 
 * @param {String} datoModelo Recibe dato String despues de la validacion del campo modelo 
 * @param {String} datoSerie Recibe dato String despues de la validacion del campo serie 
 * @param {String} datoDescripcion Recibe dato String despues de la validacion del campo descripcion 
 */
function insertar(datoFecha, datoModelo, datoSerie, datoDescripcion) {
    try {
        let transaction, solicitud, coches, coche; //variables locales

        transaction = db.transaction("coches", "readwrite"); //Transaccion para escribir/leer en el almamcen de coches
        console.log("Realizada transaction");

        coches = transaction.objectStore("coches"); // Abrir transaccion del almacen
        console.log("Listado coches abierto");

        coche = { fecha: datoFecha, modelo: datoModelo, serie: datoSerie, descripcion: datoDescripcion };//objeto coche con datos formato json
        console.log("Objeto coche creado");

        solicitud = coches.add(coche); //metodo add: aniadir el objeto coche al almacen
        console.log("Coche añadido al listado!");

        //Promisses
        solicitud.onsuccess = function () {
            console.log("Coche agregado id: ", solicitud.result); //el resultado request.result de add es la clave del nuevo objeto
            aniadeListado(solicitud.result, coche);//muestra en el listado el coche que se ha aniadido al almacen        
        };

        solicitud.onerror = function () {
            console.log("Error al intentar agregar coche: ", solicitud.error); //si ya existe el id
        };
    } catch (error) {
        console.error("Ha ocurrido un error en el método insertar(): " + error);
    }
}

/**
 * Funcion para consultar los datos que hay en el almacen y mostrarlos al usuario en una tabla
 */
function consultar() {
    try {
        //cuando se consulta puede pasar que devuelva un conjunto de datos o no, establecer cursor 
        let objectStore = db.transaction("coches").objectStore("coches"); //coleccion
        let coche;
        let cursor;

        objectStore.openCursor().onsuccess = function (e) {
            cursor = e.target.result; //cursor = resulset, del conjunto de datos es el primer registro

            if (cursor) { //el cursor entra en bucle cuando hay mas registros
                coche = { fecha: cursor.value.fecha, modelo: cursor.value.modelo, serie: cursor.value.serie, descripcion: cursor.value.descripcion };
                aniadeListado(cursor.value.id, coche); //metodo para aniadir la fila que se esta leyendo a un tabla
                cursor.continue(); //para recorrerlo hay que mover el puntero con continue
            } else {
                console.log("Actualizada vista de tabla");
            }
        };
    } catch (error) {
        console.error("Ha ocurrido un error en el método consultar(): " + error);
    }
}

/**
 * Funcion para eliminar datos del almacen
 * @param {int} idBorrar Recibe un dato int con el id del registro a eliminar
 */
function eliminar(idBorrar) {
    try {
        let request;
        //utiliza un boton confirmar, referencia tomada de w3school
        //https://www.w3schools.com/jsref/met_win_confirm.asp
        let text = "Ha presionado eliminar un registro. ¿Está seguro de eliminarlo?\nPresione Aceptar o Cancelar";
        if (confirm(text) == true) {
            request = db.transaction("coches", "readwrite").objectStore("coches").delete(idBorrar); //metodo delete: elimina el registro con el id del parentesis
            //si la eliminacion es correcta
            request.onsuccess = function (e) {
                console.log("Registro eliminado correctamente");
                alert("Registro eliminado.");
                $("#tabla").remove(); //borrar el listado
                listarTabla(); //consultar el listado actual
            };
        } else {
            alert("Operación cancelada.");
        }
    } catch (error) {
        console.error("Ha ocurrido un error en el método eliminar(): " + error);
    }
}