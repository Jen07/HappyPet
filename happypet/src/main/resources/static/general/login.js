
var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    var datos = new FormData(formulario);

    var id = datos.get("id");
    var password = datos.get("password");

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/checkloging", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id + "&password=" + password);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            var respuesta = xhttp.responseText;
        

            if (respuesta !== "") {

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

function login(userId) {
    postForm(userId);
}

function postForm(param) {
    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/login');
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', "userId");
    hiddenField.setAttribute('value', param);
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
}

