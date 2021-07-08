
var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    var datos = new FormData();

    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value




    if (password !== password2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña No coinciden!',
            footer: 'intenta de nuevo'
        })

    } else {

        datos.append("id", document.getElementById("id").value);
        datos.append("name", document.getElementById("name").value);
        datos.append("lastName", document.getElementById("lastName").value);
        datos.append("phone", document.getElementById("phone").value);
        datos.append("passw", password);
        datos.append("mail", document.getElementById("mail").value);


        $.ajax({
            type: "POST",
            url: '/client/add',
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Agregado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se registro Correctamente!',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2000,
                    }).then((result) => {
                        window.location.href = `/`;
                    });
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
});