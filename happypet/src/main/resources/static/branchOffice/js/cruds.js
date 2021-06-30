
window.addEventListener("load", startup);


window.onclick = function(event) {
	var modal = document.getElementById("myModal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
}




function startup() {
	addListeners();
	ListarSucursales();


}




function addListeners() {
	let table = document.getElementById("table_sucursal");
	table.addEventListener("click", (e) => { onTable(e) });
}

function onTable(e) {


	// Boton de detalles
	if (e.target.classList[1] == "btns-send") {
		let selectedId = e.target.parentElement.parentElement.children[0].textContent;
		getSucursalById2(selectedId);
		
	}

	// Boton de edicion
	if (e.target.classList[1] == "btns-edit") {
		
		let selectedId = e.target.parentElement.parentElement.children[0].textContent;
		getSucursalById(selectedId, ciudad);
		

	}

	// Boton de eliminacion
	if (e.target.classList[1] == "btns-delete") {
		let selectedId = e.target.parentElement.parentElement.children[0].textContent;
		let ciudad = e.target.parentElement.parentElement.children[2].textContent;
		alertDeleteSucursal(selectedId, ciudad);

	}
}








function alertDeleteSucursal(idSucursal, ciudad) {

	Swal.fire({
		title: `Quieres eliminar la sucursal de ${ciudad} ?`,
		text: "Esta accion es definitiva!",
		icon: 'question',
		showCancelButton: true,
		cancelButtonText: "Cancelar",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, eliminarlo!'
	}).then((result) => {

		if (result.isConfirmed) {
			DeleteSucursal(idSucursal);
			Swal.fire({
				icon: 'success',
				text: 'La sucursal ha sido eliminada.',
				confirmButtonText: `Ok`,
			}).then((result) => {
				if (result.isConfirmed) {
					ListarSucursales();
				}

			})


		}
	})

}



function DeleteSucursal(idSucursal) {

	$.ajax({
		type: "DELETE",
		url: "/sucursales/delete/" + idSucursal,
		cache: false,
		success: function() {

		},
		error: function(errorMessage) {
			alert(errorMessage.responseText);

		}
	});
}

/*
function ListarSucursales() {

	$.getJSON('/sucursales/listSucursal', function(json) {
		var tr = '';
		for (var i = 0; i < json.length; i++) {
			tr += '<tr>';
			tr += '<td>' + json[i].cedulaJuridica + '</td>';
			tr += '<td>' + json[i].provincia + '</td>';
			tr += '<td>' + json[i].ciudad + '</td>';
			//tr += '<td>' + json[i].correo + '</td>';
			//tr += '<td>' + json[i].telefono + '</td>';
			tr += '<td><button class="btn-sucursal btns-send"><i class="far fa-address-card"></i></button> <button class="btn-sucursal btns-delete"><i class="fas fa-trash-alt"></i></button> <button class="btn-sucursal btns-edit"><i class="far fa-edit"></i></button></td>';
			tr += '</tr>';
		}
		$('.tbody').html(tr);

	});
}

*/

function ListarSucursales() {
	
		
		$('#table_sucursal').dataTable().fnDestroy();
		
	$.getJSON('/sucursales/listSucursal', function(data) {

	$('#table_sucursal').DataTable({
		"data": data,
		"columns": [
			{"data": "cedulaJuridica"},
			{"data": "provincia"},
			{"data": "ciudad"},
			{"defaultContent": '<button class="btn-sucursal btns-send  far fa-address-card"> </button> <button class="btn-sucursal btns-delete fas fa-trash-alt"></button> <button class="btn-sucursal btns-edit far fa-edit"></i></button>'}
		],
		"language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
		lengthMenu: [[5, 10, -1], [5, 10, "All"]],

	});
	
	});
}



function getSucursalById(idSucursal) {



	$.ajax({
		url: "/sucursales/getSucursal/" + idSucursal,
		type: "GET",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function(result) {

			
			document.querySelector("#CedulaJuridica").value = result.cedulaJuridica;
			$("#CedulaJuridica").attr("readonly", true)
			const $select = document.querySelector("#provincia");
			for (var i = 0; i < $select.length; i++) {
				if (result.provincia == $select.options[i].value) {
					$select.selectedIndex = i;
					fillSelectCiudad(i + 1, result.ciudad);

				}
			}
			document.getElementById("correo").value = result.correo;
			document.getElementById("telefono").value = result.telefono;
			document.getElementById("horaInicio").value = result.horaInicio;
			document.getElementById("horaFinal").value = result.horaFinal;


			document.querySelector("#CedulaJuridica").addEventListener("click", alertNoedit);
			$select.addEventListener("click", clickSelectProvincia);
			openModal(result.ciudad);


		},
		error: function(errorMessage) {
			alert(errorMessage.responseText);
		}
	});


}

function getSucursalById2(idSucursal) {
		alert("entro");

		$.getJSON('/sucursales/getSucursal/' + idSucursal, function(sucursal) {
		var modal = '';
		modal+='<div class="cardD">';
		modal+='<ul>';
		modal+=' <li> Cédula Juridica: <label >'+sucursal.cedulaJuridica+'</label></li>';
		modal+=' <li> Provincia: <label>'+sucursal.provincia+'</label></li>';
		modal+=' <li> Ciudad: <label>'+sucursal.ciudad+'</label></li>';
		modal+=' <li> Correo: <label>'+sucursal.correo+'</label></li>';
		modal+=' <li> Telefono: <label>'+sucursal.telefono+'</label></li>';
		modal+=' <li> Hora de inicio: <label>'+sucursal.horaInicio+'</label></li>';
		modal+='<li> Hora de cierre:  <label>'+sucursal.horaFinal+'</label></li>';
		modal+='</ul>';
		modal+='<div>';
		modal+='</div>';
		
		$('.modal-body').html(modal);
		openModal2();
		
	});


}



function updateSucursal() {

	var sucursal = {
		cedulaJuridica: $('#CedulaJuridica').val(),
		provincia: $('#provincia').val(),
		ciudad: $('#ciudad').val(),
		correo: $('#correo').val(),
		telefono: $('#telefono').val(),
		horaInicio: $('#horaInicio').val(),
		horaFinal: $('#horaFinal').val(),
	}

	if (validarCamposVacios(sucursal)) {

		$.ajax({
			url: "/sucursales/updateSucursal",
			data: JSON.stringify(sucursal),
			type: "PUT",
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function() {

				Swal.fire({
					icon: 'success',
					text: 'La sucursal ha sido actualizada',
					confirmButtonText: `Ok`,

				});
				closeModal();
				ListarSucursales();


			},
			error: function(errorMessage) {
				alert(errorMessage.responseText);
			}
		});

	}
}





//metodos de cierre e inicio del modal de update

function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

function openModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "block";

}

function closeModal2() {
	var modal = document.getElementById("myModalDetails");
	modal.style.display = "none";
}

function openModal2() {
	var modal = document.getElementById("myModalDetails");
	modal.style.display = "block";

}



function alertNoedit() {
	var ToastP = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timerProgressBar: true,
	});


	ToastP.fire({
		icon: "warning",
		title: "Campo no editable.",
		timer: 2000,
	});


}










