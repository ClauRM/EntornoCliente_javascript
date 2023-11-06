//VARIABLES GLOBALES
var boton = document.getElementById("resolver");

boton.addEventListener("click", function () {
    resolver(); //ejecuta la funcion resolver
});

boton.addEventListener("mouseover", function () {
    boton.textContent = "¡Suerte!";
});

boton.addEventListener("mouseout", function () {
    boton.textContent = "Resolver";
})

function resolver() {
    try {
        let correcta = document.getElementById("buscador");
        let incorrectas = document.getElementsByTagName("label");

        //pintar todas en rojo
        for (let i = 0; i < incorrectas.length; i++) {
            incorrectas[i].style.backgroundColor = "LightPink";
        }

        //colorear de verde solo la correcta
        correcta.style.backgroundColor = "LimeGreen";
    } catch (error) {
        console.error("Ha ocurrido un error en el método resolver(): " + error);
    }
}