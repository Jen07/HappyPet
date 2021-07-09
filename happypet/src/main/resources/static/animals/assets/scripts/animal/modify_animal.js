const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const selects = document.querySelectorAll("#formulario select");
const born = document.getElementById("born");

const expresiones = {
    nombre: /^[a-zA-Z]{3,15}$/,
    altura: /^\d{2,5}$/,
    peso: /^\d{2,5}$/,
    raza: /^[a-zA-Z]{3,15}$/,
    especie: /^[a-zA-Z]{3,15}$/,
    fecha: /^[a-zA-Z]{3,15}$/,
}

const campos = {
    nombre: true,
    altura: true,
    peso: true,
    raza: true,
    especie: true,
    fecha: true,
}

const validarForm = (e) => {

    switch (e.target.name) {
        case "name":
            validarCampo(expresiones.nombre, e.target, 'name', 'nombre');
            break;

        case "height":
            validarCampo(expresiones.altura, e.target, 'height', 'altura');
            break;

        case "weight":
            validarCampo(expresiones.peso, e.target, 'weight', 'peso');
            break;

        case "breed":
            validarSelect(e.target, 'breed', 'raza');
            break;

        case "specie":
            validarSelect(e.target, 'specie', 'especie');
            break;

        case "born":
            validarSelect(e.target, 'born', 'fecha');
            break;

        case "owner":
            validarSelect(e.target, 'owner', 'duenio');
            break;
    }
}

const validarCampo = (expresion, input, campo, nombre) => {

    if (expresion.test(input.value)) {
        setChecked(campo);
        campos[nombre] = true;

    } else {
        setUnChecked(campo);
        campos[nombre] = false;
    }
}

const validarSelect = (input, campo, nombre) => {

    if (input.value != "") {
        setChecked(campo)
        campos[nombre] = true;

    } else {
        setUnChecked(campo);
        campos[nombre] = false;
    }

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});

selects.forEach((input) => {
    input.addEventListener('change', validarForm);
});

born.addEventListener('change', validarForm);


formulario.addEventListener('submit', (e) => {
    if (!(campos.altura && campos.peso && campos.raza && campos.especie && campos.fecha)) {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo'); 3
        e.preventDefault();
        reValidate();

        Swal.fire({
            title: 'Error en el formulario',
            text: "Verifique la información e intente de nuevo",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        });
    }
});

const reValidate = () => {

    if (document.getElementById('name').value != "") {
        validarCampo(expresiones.nombre, document.getElementById('name'), 'name', 'nombre');
    }

    validarCampo(expresiones.altura, document.getElementById('height'), 'height', 'altura');
    validarCampo(expresiones.peso, document.getElementById('weight'), 'weight', 'peso');
    validarSelect(document.getElementById('combo_breed'), 'breed', 'raza');
    validarSelect(document.getElementById('combo_specie'), 'specie', 'especie');
    validarSelect(document.getElementById('born'), 'born', 'fecha');


    if (document.getElementById('combo_client')) {
        validarSelect(document.getElementById('combo_client'), 'owner', 'duenio');
    }
}

const setChecked = (campo) => {
    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');

    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
}

const setUnChecked = (campo) => {
    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');

    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
}