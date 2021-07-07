function inicio(){
    dar('salary');
   // document.getElementById("op2").style.background='#BC4944';
   // document.getElementById("op3").style.background='#BC4944';
}


const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");

const expresiones = {
    id: /^[0-9\-]{9}$/,
    name: /^[A-Za-zÁ-ÿ0-9\s]{4,10}$/, 
    lastName: /^[A-Za-zÁ-ÿ0-9\s]{4,10}$/,
    tel: /^[0-9\-]{8,10}$/,
    salary: /^[0-9\.]{7,15}$/, //-----------------
    passw: /^[a-zA-Z0-9\-\.\ñ\_]{4,12}$/,
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$/,//--------------------------
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

function dar(id){
    const number = document.querySelector("#" + id);
    const element =number;
    const value = element.value;
    element.value = formatNumber(value);
}

//Poner valida antes de poner formato numero
function formatNum(id, e) {
    const number = document.querySelector("#" + id);

    if (valideKey(e)) {
        const element = number;
        const value = element.value;
        element.value = formatNumber(value);
    }
}

//Formato numerico
function formatNumber(number) {
    number = String(number).replace(/\D/g, "");
    return number === '' ? number : Number(number).toLocaleString(['ban', 'id']);
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
    id: true,
    name: true,
    lastName: true,
    tel: true,
    salary: true,
    passw: true,
    mail: true,
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

        case "salary":
            validarCampo(expresiones.salary, e.target, 'salary', 'salary');
            break;

        case "passw":
            validarCampo(expresiones.passw, e.target, 'passw', 'passw');
            break;

        case "mail":
            validarCampo(expresiones.mail, e.target, 'mail', 'mail');
            break;
    }
}

const validarCampo = (expresion, input, campo, nombre) => {

    if (expresion.test(input.value)) {

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');

        if ( nombre != 'passw' ) {
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        }

        campos[nombre] = true;

    } else {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');

        if ( nombre != 'passw' ) {
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
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
        && campos.mail) {

        registrar();

    } else {
        Swal.fire({
            title: 'Error al mandar',
            text: "Llene la informacion correctamente",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
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
        var file_data = $("#imagen").prop("files")[0];
        datos.append("imagen", file_data);

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
                        title:  'Se modifico Correctamente',
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
    fileName.textContent = uploadedFileName;
});