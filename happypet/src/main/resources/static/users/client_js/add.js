window.onload = function(){
    document.getElementById("op2").style.background='#BC4944';
    document.getElementById("op4").style.background='#BC4944';
}

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");

const expresiones = {
    id: /^[0-9\-]{9}$/,
    name: /^[A-Za-zÁ-ÿ\s]{4,10}$/,
    lastName: /^[A-Za-zÁ-ÿ\s]{4,10}$/,
    tel: /^[0-9\-]{8,10}$/,
    passw: /^[a-zA-Z0-9\-\.\ñ\_]{4,12}$/,
    passw2: /^[a-zA-Z0-9\-\.\ñ\_]{4,12}$/,
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$/,//--------------------------
    address:/^[a-zA-Z0-9Á-ÿ\s\-\.\ñ\_\#]{4,150}$/,
}

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


//Formato cedula
function formatId(mascara, documento, evt) {
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

//** Estilo del form Correcto - Incorrecto */

const campos = {
    id: false,
    name: false,
    lastName: false,
    tel: false,
    passw: false,
    mail: false,
    address: false
}


const validarForm = (e) => {
    switch (e.target.name) {

        case "id":
            validarCampo(expresiones.id, e.target, 'id', 'id');
            break;

        case "name":
            validarCampo(expresiones.name, e.target, 'name', 'name');
            break;

        case "lastName":
            validarCampo(expresiones.lastName, e.target, 'lastName', 'lastName');
            break;

        case "tel":
            validarCampo(expresiones.tel, e.target, 'tel', 'tel');
            break;

        case "passw":
                validarCampo(expresiones.passw, e.target, 'passw', 'passw');
                break;

        case "mail":
            validarCampo(expresiones.mail, e.target, 'mail', 'mail');
            break;

        case "address":
            validarCampo(expresiones.address, e.target, 'address', 'address');
            break;
    }
}

const validarCampo = (expresion, input, campo, nombre) => {

    if (expresion.test(input.value)) {

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');

        if (nombre != 'passw' && nombre != 'address') {
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        }

        campos[nombre] = true;

    } else {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');

        if (nombre != 'passw' && nombre != 'address') {
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        }
        campos[nombre] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});

textA.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.name && campos.lastName && campos.tel && campos.id && campos.passw
        && campos.mail && campos.address ) {

        registrar();

    } else {
        var divError = document.querySelectorAll(".formulario__grupo");

        divError.forEach((input) => {
            var inputError = document.querySelector(`#${input.id} input`);


            if (inputError != null) {
                if (!campos[inputError.id]) {
                    revalidated(input.id);
                }
            } else {
                if (!campos.address) {
                    revalidated("grupo__address");
                }
            }

        });

        Swal.fire({
            title: 'Error en el Formulario',
            text: "Verifique la información e intente de nuevo",
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        });

    }
});

function revalidated(campo) {
    document.getElementById(`${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`${campo}`).classList.remove('formulario__grupo-correcto');
    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    document.querySelector(`#${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#${campo} i`).classList.remove('fa-check-circle');
}

// Cuanto toca boton agregar con los campos ya correctos
function registrar() {
    var datos = new FormData();

    datos.append("name", document.getElementById("name").value);
    datos.append("lastName", document.getElementById("lastName").value);
    datos.append("id", document.getElementById("id").value);
    datos.append("phone", document.getElementById("tel").value);
    datos.append("passw", document.getElementById("passw").value);
    datos.append("mail", document.getElementById("mail").value);
    datos.append("address", document.getElementById("address").value);

    if (document.getElementById("imagen").value != '') { // edita la imagen
        // var file_data = $("#imagen").prop("files")[0];
        // datos.append("imagen", file_data);

        reduceFileSize(document.getElementById('imagen').files[0], 500 * 1024, 1000, Infinity, 0.9, blob => {
            datos.append('imagen', blob, blob.name || "file.jpg");

        $.ajax({
            type: "POST",
            url: '/client/addClient',
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Agregado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se agregó Correctamente',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2000,
                    }).then((result) => {
                        window.location.href = `/client/inicio`;
                    });
                }else {
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
    });
    } else {
        $.ajax({
            type: "POST",
            url: '/client/addClient2',
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Agregado") {
                    Swal.fire({
                        position: '',
                        icon: 'success',
                        title: 'Se agregó Correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then((result) => {
                        window.location.href = `/client/inicio`;
                    });
                }else {
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
}

let inputFile = document.getElementById("imagen");
let fileName = document.getElementById("file-name");

inputFile.addEventListener('change', function (event) {
    let uploadedFileName = event.target.files[0].name;
    let vari = uploadedFileName.split('.');
    if (vari[vari.length - 1] == "png" || vari[vari.length - 1] == "jpg" || vari[vari.length - 1] == "jpeg") {
        fileName.textContent = uploadedFileName;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Solo se permiten imágenes',
            timer: 2000
        });
        fileName.textContent = "ninguno";
        document.getElementById("imagen").value = "";
    }
});