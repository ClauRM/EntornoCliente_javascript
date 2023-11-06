$(document).ready(function () {

    //listener sobre el boton spoiler
    $("#spoiler").click(function () {
        $("#mensaje").show();//muestra el contenido del div 
    });

    $("#animar").click(function () {
        $("#imagen").animate({
            opacity: 0.25,
            height: "toggle"
        }, 5000, function () {
            // Animation complete.
        });
    });
});
