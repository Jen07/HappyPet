
var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
 
    var datos = new FormData(formulario);

    var id=  datos.get("id");
    var password=  datos.get("password");

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login/checkloging", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id + "&password=" + password);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            var respuesta = xhttp.responseText;
            console.log("Entro   " + respuesta);
            if (respuesta !== "null") {

                let timerInterval
                Swal.fire({
                    title: 'Cargando Datos!',
                    html: 'Ingresara en <b></b> milliseconds.',
                    timer: 1000,
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
                    login(respuesta)
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

function login(id){
    console.log(id);
    const xhr = new XMLHttpRequest();

            xhr.open("POST", `/login`, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`id=${id}`);
            
            xhr.addEventListener("loadend", (info) => {
                window.location.href=`/sucursal/`;
            });
}
