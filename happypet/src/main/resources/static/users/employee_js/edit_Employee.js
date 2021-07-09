function inicio() {
    var num = document.getElementById("salary").value;
    document.getElementById("salary").value=formatNumber(num);
    document.getElementById("op2").style.background = '#BC4944';
    document.getElementById("op3").style.background = '#BC4944';
}

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");

const expresiones = {
    name: /^[A-Za-zÁ-ÿ0-9\s]{4,10}$/,
    lastName: /^[A-Za-zÁ-ÿ0-9\s]{4,10}$/,
    tel: /^[0-9\-]{8,10}$/,
    salary: /^[0-9\.]{7,15}$/, //-----------------
    passw: /^[a-zA-Z0-9\-\.\ñ\_]{4,12}$/,
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

$("#salary").keypress(function () {
    const number = document.querySelector('#salary');
    number.addEventListener('keyup', (e) => {
            const element = e.target;
            const value = element.value;
            element.value = formatNumber(value);
    });
});


function formatNumber(n) {
    n = String(n).replace(/\D/g, "");
    return n === '' ? n : Number(n).toLocaleString(['ban', 'id']);
}

$('#salary').keypress(function (tecla) {
    if (tecla.charCode < 48 || tecla.charCode > 57) {
        return false;
    }
});

function numb(num){
    return formatNumber(num);
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
    name: true,
    lastName: true,
    tel: true,
    salary: true,
    passw: true,
    mail: true,
    address: true
}

/**Validación de los campos */
const validarForm = (e) => {
    switch (e.target.name) {

        case "name":
            validarCampo(expresiones.name, e.target, 'name', 'name');
            break;

        case "lastName":
            validarCampo(expresiones.lastName, e.target, 'lastName', 'lastName');
            break;

        case "tel":
            validarCampo(expresiones.tel, e.target, 'tel', 'tel');
            break;

        case "salary":
            validarCampo(expresiones.salary, e.target, 'salary', 'salary');
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

    if (campos.name && campos.lastName && campos.tel && campos.salary && campos.passw
        && campos.mail && campos.address) {

        registrar();

    } else {

        Swal.fire({
            title: 'Error en el Formulario',
            text: "Verifique la información e intente de nuevo",
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        });
    }
});

/* Quitar puntos */
function quitar() {
    var salary = document.getElementById("salary").value;
    while (salary.toString().indexOf(".") != -1)
        salary = salary.toString().replace(".", "");
    return salary;
}


// Cuanto toca boton agregar con los campos ya correctos
function registrar() {
    var datos = new FormData();

    datos.append("name", document.getElementById("name").value);
    datos.append("lastName", document.getElementById("lastName").value);
    datos.append("id", document.getElementById("id").value);
    datos.append("salary", quitar());
    datos.append("tel", document.getElementById("tel").value);
    datos.append("type", document.getElementById("type").value);
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
            url: '/employee/edit',
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Listo") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se modifico Correctamente',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2000,
                    }).then((result) => {
                        window.location.href = `/employee/inicio`;
                    });
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
    } else {
        datos.append("oldImage", document.getElementById("oldimagen").value);
        $.ajax({
            type: "POST",
            url: '/employee/edit2',
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Listo") {
                    Swal.fire({
                        position: '',
                        icon: 'success',
                        title: 'Se modifico Correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then((result) => {
                        window.location.href = `/employee/inicio`;
                    });
                }
            },
            error: function (data) {
                console.log(data);
                alert("ERROR TEMPOTAL");
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