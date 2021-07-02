


//validacion de campos del formulario 
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




function format(mascara, documento,evt) {
	
	if(valideKey(evt)){
	var i = documento.value.length;
	var salida = mascara.substring(0, 1);
	var texto = mascara.substring(i)

	if (texto.substring(0, 1) != salida) {
		documento.value += texto.substring(0, 1);
	}
	}else{
		return false;
	}

}



function validarCamposVacios(sucursal) {

	var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var ToastP = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timerProgressBar: true,
	});




	if ((sucursal.correo == "") || (sucursal.cedulaJuridica == "") ||
		(sucursal.telefono == "") || (sucursal.horaInicio == "") || (sucursal.horaFinal == "")) {
		ToastP.fire({
			icon: "error",
			title: "Los campos no pueden quedar vacios.",
			timer: 5000,
		});

		return false;
	}


	if (sucursal.cedulaJuridica.length != 10) {

		ToastP.fire({
			icon: "error",
			title: "Cédula Juridica incorrecta.",
			timer: 5000,
		});

		return false;
	}



	if (!expr.test(sucursal.correo)) {

		ToastP.fire({
			icon: "error",
			title: "Error: La dirección de correo " + sucursal.correo + " es incorrecta.",
			timer: 5000,
		});

		return false;
	}
	
		if (sucursal.telefono.length != 8 || parseInt(sucursal.telefono.charAt(0), 10) < 5 ) {
			
		ToastP.fire({
			icon: "error",
			title: "Número de telefono invalido.",
			timer: 5000,
		});

		return false;
	}

	
	return true;


}


//metodos para el control de los select en el modal de update y el form de insertSucursal
function fillSelectCiudad(codigoSucursal, ciudad) {
	
	cleanSelectCiudad();

	$.getJSON('/sucursales/listCantones/' + codigoSucursal, function(result) {


		const $select = document.querySelector("#ciudad");
		for (var i = 0; i < result.length; i++) {

			const option = document.createElement('option');
			option.value = result[i];
			option.text = result[i];
			$select.appendChild(option);

		}
		
		if (ciudad != "denegado!") {
			setCiudad(ciudad, $select);
		}
	});
}



function setCiudad(ciudad,$select){
	
	for (var i = 0; i < $select.length; i++) {
				
				if (ciudad == $select.options[i].value) {
					$select.selectedIndex = i;
					
				}
			}
}

function cleanSelectCiudad() {

	const $select = document.querySelector("#ciudad");
	for (let i = $select.options.length; i >= 0; i--) {
		$select.remove(i);
	}
}



function clickSelectProvincia() {

	const $select = document.querySelector("#provincia");
	fillSelectCiudad($select.selectedIndex + 1,"denegado!");

}



