
window.addEventListener("load", startup);

function startup() {
	addListeners();
	clickSelectProvincia();
	
}

function addListeners() {
	let $select = document.getElementById("provincia");
	$select.addEventListener("click", clickSelectProvincia);
	
	
}



function addSucursal() {

let cantonDeleted=document.getElementById("ciudad").value;

	var sucursal = {
		cedulaJuridica: $('#CedulaJuridica').val(),
		provincia: $('#provincia').val(),
		ciudad: $('#ciudad option:selected').html(),
		correo: $('#correo').val(),
		telefono: $('#telefono').val(),
		horaInicio: $('#horaInicio').val(),
		horaFinal: $('#horaFinal').val(),
	}
		
		$.ajax({
			url: "/sucursales/addSucursal/"+cantonDeleted,
			data: JSON.stringify(sucursal),
			type: "POST",
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function() {

				Swal.fire({
					icon: 'success',
					text: 'La sucursal ha sido registrada',
					confirmButtonText: `Ok`,
				}).then((result) => {
					if (result.isConfirmed) {
						clearForm();
						document.getElementById('CedulaJuridica').value = "";
						document.getElementById('provincia').value = 1,
							fillSelectCiudad(1);
						document.getElementById('correo').value = "";
						document.getElementById('telefono').value = "";
						document.getElementById('horaInicio').value = "";
						document.getElementById('horaFinal').value = "";


					}
				});


			},
			error: function(errorMessage) {
				Swal.fire({
					icon: 'error',
					text: 'Problemas conectando a la base de datos',
					showConfirmButton: false,
					timerProgressBar: true,
					timer: 2000,
				})
				alert(errorMessage.responseText);
			}
		});
}




