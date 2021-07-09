const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");


const expresiones = {
	CedulaJuridica: /[0-9+-]{12}/,
	telefono: /[0-9+-]{9}/,
	correo: /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/,
	horaInicio: /^[0-9]/,
	horaFinal: /^[0-9]/,

}

var campos = {
	CedulaJuridica: false,
	telefono: false,
	correo: false,
	horaInicio: false,
	horaFinal: false
}

const validarForm = (e) => {
	switch (e.target.name) {
		case "CedulaJuridica":
			validarCampo(expresiones.CedulaJuridica, e.target, 'CedulaJuridica', 'CedulaJuridica');

			break;

		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono', 'telefono');
			break;

		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo', 'correo');
			break;

		case "horaInicio":
			validarCampo(expresiones.horaInicio, e.target, 'horaInicio', 'horaInicio');
			break;

		case "horaFinal":
			validarCampo(expresiones.horaFinal, e.target, 'horaFinal', 'horaFinal');
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
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');

		campos[nombre] = true;

	} else {
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');

		campos[nombre] = false;

	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarForm);
	input.addEventListener('blur', validarForm);
});


formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if (campos.CedulaJuridica && campos.telefono && campos.correo
		&& campos.horaInicio && campos.horaFinal) {

		let CitySelected = $('#ciudad option:selected');

		if (document.querySelector("#btnForm").value == "Registrar") {

			if (CitySelected[0].className == '') {
				addSucursal();
			} else {
				Swal.fire({
					title: 'Ciudad no disponible',
					text: "Ya hay una sucursal en esta ciudad por favor selecione otra ciudad",
					icon: 'error',
					showConfirmButton: false,
					timer: 2000
				});
			}
		} else {
			if (!CitySelected[0].className == '') {
				updateSucursal();
			} else {
				Swal.fire({
					title: 'Ciudad no disponible',
					text: "Ya hay una sucursal en esta ciudad por favor selecione otra ciudad",
					icon: 'error',
					showConfirmButton: false,
					timer: 2000
				});
			}
		}
	} else {
		//document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		var divError = document.querySelectorAll(".formulario__grupo");

		divError.forEach((input) => {
			var inputError = document.querySelector(`#${input.id} input`);

			if (!campos[inputError.id]) {
				revalidated(input.id);
			}

		});

		Swal.fire({
			title: 'Error en el formulario',
			text: "Verifique la información e intente de nuevo",
			icon: 'error',
			showConfirmButton: false,
			timer: 2000
		});

	}
});


function revalidated(campo) {

	document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
	document.getElementById(`${campo}`).classList.add('formulario__grupo-incorrecto');
	document.getElementById(`${campo}`).classList.remove('formulario__grupo-correcto');
	document.querySelector(`#${campo} i`).classList.add('fa-times-circle');
	document.querySelector(`#${campo} i`).classList.remove('fa-check-circle');
	document.querySelector(`#${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');

}

function clearForm() {
	var divError = document.querySelectorAll(".formulario__grupo");

	divError.forEach((input) => {
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById(`${input.id}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#${input.id} i`).classList.add('fa-times-circle');
		document.querySelector(`#${input.id} i`).classList.remove('fa-check-circle');
		
	});
	campos = {
		CedulaJuridica: false,
		telefono: false,
		correo: false,
		horaInicio: false,
		horaFinal: false
	}

}

function paintFormUpdate() {
	var divError = document.querySelectorAll(".formulario__grupo");

	divError.forEach((input) => {
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById(`${input.id}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#${input.id} i`).classList.add('fa-check-circle');
		document.querySelector(`#${input.id} i`).classList.remove('fa-times-circle');
		document.querySelector(`#${input.id} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	});
	campos = {
		CedulaJuridica: true,
		telefono: true,
		correo: true,
		horaInicio: true,
		horaFinal: true
	}
}


