
var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
 
    var datos = new FormData(formulario);

    var id=  datos.get("id");
    var password=  datos.get("password");

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/checkloging", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id + "&password=" + password);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            var respuesta = xhttp.responseText;
            console.log("Entro   " + respuesta);
            if (respuesta === "true") {

                let timerInterval
                Swal.fire({
                    title: 'Cargando Datos!',
                    html: 'Ingresara en <b></b> milliseconds.',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            const content = Swal.getHtmlContainer()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                }
                            }
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    window.location.href = `/entry`;
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contraseña o Usuario Incorrecto!',
                    footer: 'intenta de nuevo'
                })
            }
        }
    };


});
