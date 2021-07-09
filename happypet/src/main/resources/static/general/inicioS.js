//Validar solo entre numeros
function valideKey(evt) {
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;

    if (code == 8) { // backspace.
        return true;
    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        return false;
    }
}

//formato telefonico
function format(mascara, documento, evt) {
    if (valideKey(evt)) {
        var i = documento.value.length;
        var salida = mascara.substring(0, 1);
        var texto = mascara.substring(i)

        if (texto.substring(0, 1) != salida) {
            documento.value += texto.substring(0, 1);
        }

    } else {
        return false;
    }
}


var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    var datos = new FormData();

    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    var id = document.getElementById("id").value;

    if (password !== password2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña No coinciden!',
            footer: 'intenta de nuevo'
        })

    } else {

        datos.append("id", id);
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
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ya esxiste esa cedula!',
                        footer: 'intenta de nuevo'
                    })
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

});