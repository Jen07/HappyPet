// window.onload = function(){
//     document.getElementById("op4").style.background='#BC4944';
//     document.getElementById("op5").style.background='#BC4944';
// }

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");

const expresiones = {
    name: /^[A-Za-zÁ-ÿ\s]{4,10}$/,
    color: /^[A-Za-zÁ-ÿ\s]{4,10}$/,
    price: /^[0-9\.]{7,15}$/, //-----------------
    description: /^[a-zA-Z0-9Á-ÿ\s\-\.\ñ\_\#]{4,150}$/,
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

$("#price").keypress(function () {
    const number = document.querySelector('#price');
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

$('#price').keypress(function (tecla) {
    if (tecla.charCode < 48 || tecla.charCode > 57) {
        return false;
    }
});


//** Estilo del form Correcto - Incorrecto */

const campos = {
    name: false,
    color: false,
    price: false, 
    description: false
}


const validarForm = (e) => {
    switch (e.target.name) {

        case "name":
            validarCampo(expresiones.name, e.target, 'name', 'name');
            break;

        case "color":
            validarCampo(expresiones.color, e.target, 'color', 'color');
            break;

        case "price":
            validarCampo(expresiones.price, e.target, 'price', 'price');
            break;

        case "description":
            validarCampo(expresiones.description, e.target, 'description', 'description');
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

        if (nombre != 'description') {
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        }

        campos[nombre] = true;

    } else {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');

        if (nombre != 'description') {
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

    if (campos.name && campos.color && campos.price && campos.description) {

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
                    revalidated("grupo__description");
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

    if (campo != "address") {
        document.querySelector(`#${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#${campo} i`).classList.remove('fa-check-circle');
    }
}
/* Quitar puntos */
function quitar() {
    var price = document.getElementById("price").value;
    while (price.toString().indexOf(".") != -1)
        price = price.toString().replace(".", "");
    return price;
}


// Cuanto toca boton agregar con los campos ya correctos
function registrar() {
    var datos = new FormData();

    datos.append("name", document.getElementById("name").value);
    datos.append("color", document.getElementById("color").value);
    datos.append("price", document.getElementById("price").value);
    datos.append("type", document.getElementById("type").value);
    datos.append("size", document.getElementById("size").value);
    datos.append("availability", document.getElementById("availability").value);
    datos.append("description", document.getElementById("description").value);

  

    if (document.getElementById("imagen").value != '') { // edita la imagen
        var file_data = $("#imagen").prop("files")[0];
        datos.append("imagen", file_data);

        $.ajax({
            type: "POST",
            url: '/employee/add',
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
                        window.location.href = `/employee/inicio`;
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
    } else {
        $.ajax({
            type: "POST",
            url: '/clothes/add',
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
                        window.location.href = `/clothes/inicio`;
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
}

let inputFile = document.getElementById("imagen");
let fileName = document.getElementById("file-name");

inputFile.addEventListener('change', function (event) {
    let uploadedFileName = event.target.files[0].name;
    let vari = uploadedFileName.split('.'); 
     
    alert(vari.endsWith("png"));
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

  