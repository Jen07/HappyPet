
window.addEventListener("load", startup);



function startup() {
	addListeners();
	document.getElementById("op9").style.background='#BC4944';
    document.getElementById("op11").style.background='#BC4944';
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
		getSucursalById(selectedId);
		

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
		icon: 'warning',
		showCancelButton: true,
		cancelButtonText: "Cancelar",
		confirmButtonColor: '#80BD5D',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, eliminarlo!'
	}).then((result) => {

		if (result.isConfirmed) {
			DeleteSucursal(idSucursal);			
		}
	})

}



function DeleteSucursal(idSucursal) {

	$.ajax({
		type: "DELETE",
		url: "/sucursales/delete/" + idSucursal,
		cache: false,
		success: function() {
			Swal.fire({
				icon: 'success',
				text: 'La sucursal ha sido eliminada.',
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 2000,
			}).then((result) => {		
				resetTable();
				
			})
		},
		error: function(errorMessage) {
			Swal.fire({
				icon: 'error',
				text: 'Problemas conectando a la base de datos',
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 2000,
			})

		}
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
			paintFormUpdate();


		},
		error: function(errorMessage) {
			Swal.fire({
				icon: 'error',
				text: 'Problemas conectando a la base de datos',
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 1500,
			})
		}
	});


}

function getSucursalById2(idSucursal) {
		

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
		
		$('.modal-body2').html(modal);
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
					showConfirmButton: false,
					timerProgressBar: true,
					timer: 2000,

				});
				closeModal();
				resetTable();


			},
			error: function(errorMessage) {
				Swal.fire({
					icon: 'error',
					text: 'Problemas conectando a la base de datos',
					showConfirmButton: false,
					timerProgressBar: true,
					timer: 1500,
				})
			}
		});
	
}

function filterTable() {
    let filterBy = document.getElementById("selectSearch").value;
    let filter = document.getElementById("inputSearch").value;


    $.ajax({
		type: "GET",
		url: `/sucursales/filter_table?filterBy=${filterBy}&filter=${filter}`,
		success: function(result) {
			
			sucursalPG = [];
			sucursalTD = [];
	
			loadRows(result);
	
		},
		error: function(errorMessage) {
			Swal.fire({
				icon: 'error',
				text: 'Problemas conectando a la base de datos',
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 2000,
			})

		}
	});
    

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










