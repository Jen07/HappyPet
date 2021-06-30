
window.addEventListener("load", startup);
var codeModificar;


function startup() {
	addListeners();
	ListarHoteles();
}

function addListeners() {
	let table = document.getElementById("table");
	table.addEventListener("click", (e) => { onTable(e) });
}

function onTable(e) {

	// Boton de detalles
	if (e.target.classList[1] == "button-send") {
		let selectedId = e.target.parentElement.parentElement.children[0].textContent;
		 listado(selectedId);
	}

	// Boton de edicion
	if (e.target.classList[1] == "button-edit") {
		let selectedId = e.target.parentElement.parentElement.children[0].textContent;
		modal(selectedId);
	}

	// Boton de eliminacion
	if (e.target.classList[1] == "button-delete") {
		let selectedId = e.target.parentElement.parentElement.children[0].textContent;
		let nombreHotel = e.target.parentElement.parentElement.children[1].textContent;
		deleteAlert(selectedId, nombreHotel);

	}
}

function deleteAlert(idHotel, nombreHotel) {

	swal.fire({
		title: `Desea eliminar el hotel ` + nombreHotel + `?`,
		text: "Esta acción es definitiva",
		Icon: 'question',
		showCancelButton: true,
		cancelButtonText: "Cancelar",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, eliminarlo!'
	}).then((result) => {
		if (result.isConfirmed) {
			deleteHotel(idHotel)
			Swal.fire({
				Icon:'succes',
				text: "Eliminado éxitosamente",
				confirmButtonText: 'OK'
			}).then((result)=>{
                 if(result.isConfirmed){
                    location.reload();
				 }
			})
		}
	})
}

function deleteHotel(idHotel) {
	$.ajax({
		type: "DELETE",
		url: "/hoteles/delete/" + idHotel,
		cache: false,
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function (result) {
			
		},
		error: function (errorMessage) {
			alert(errorMessage.responseText);
		}
	});

}

function modal(idHotel) {
	$.ajax({
		type: "Get",
		url: "/hoteles/GetHotel/" + idHotel,
		cache: false,
		success: function(result) {

			llenarSelect(result);
            codeModificar=result.code;
			document.getElementById("price").value = result.price;
			document.getElementById("description").value = result.description;
			document.getElementById("numberOfRooms").value = result.numberOfRooms;
			document.getElementById("address").value = result.address;
			document.getElementById("phone").value = result.phone;
         
            cleanSelect();
			var modal = document.getElementById("myModal");
			modal.style.display = "block";
		},
		error: function(errorMessage) {
			alert(errorMessage.responseText);
		}
	});

}

function closeModal(){
	var modal=document.getElementById("myModal");
	modal.style.display="none";
	var modal2=document.getElementById("ver");
	modal2.style.display="none";
	
}

function llenarSelect(result) {
	$.getJSON("/hoteles/listaSucursales", function(lista) {
		var select = document.querySelector("#codSucursal");
		for (var i = 0; i < lista.length; i++) {
			var option = document.createElement("option");
			option.value = lista[i].cedulaJuridica;
			option.text = lista[i].ciudad;
			select.add(option);
		}
		const $select = document.querySelector("#codSucursal");
		for (var i = 0; i < $select.length; i++) {

			if (result.sucursal.ciudad == $select.options[i].text) {
				$select.selectedIndex = i;
			}
		}
	});

}

function cleanSelect(){
	
	const $select = document.querySelector("#codSucursal"); 
	 for (let i = $select.options.length; i >= 0; i--) {
    $select.remove(i);
  }
}

function modify(){
	
	var hotel = {

		code: $('#codSucursal').val(),
		numberOfRooms: $('#numberOfRooms').val(),
		price: $('#price').val(),
		phone: $('#phone').val(),
		address: $('#address').val(),
		description: $('#description').val(),
	};
    
	$.ajax({
		url: "/hoteles/modify/"+codeModificar,
		data: JSON.stringify(hotel),
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function(result) {
			Swal.fire({
				Icon:'succes',
				text: "Modificado Exitosamente",
				confirmButtonText: 'OK'
			}).then((result)=>{
                 if(result.isConfirmed){
                    location.reload();
				 }
			})
	
		},
		error: function(errorMessage) {
			alert(errorMessage.responseText);
		}
	});
	
}

function listado(id) {
	
	$.getJSON("/hoteles/GetHotel/"+id, function (hotel) {
		var html = '';
			html+=' <div >';
		    html+= '<label>  Nombre Veterinaria:'+ hotel.sucursal.ciudad +' </label>'
			html+='</div>';
			html+='<ul >';
			html+='<li ><label># habitaciones:     '+ hotel.numberOfRooms +' </label></li> ';
			html+='<li ><label>Precio:    ' + hotel.price+'   </label></li>';
			html+='<li ><label>Tel&eacute;fono:   ' + hotel.phone+ ' </label></li>';
			html+='<li ><label>Direcci&oacute;n:     ' + hotel.address+ ' </label></li>';
			html+='<li ><label>Descripci&oacute;n:    ' + hotel.description+ ' </label></li>';
			html+='</ul>';
		    
        $('.body').html(html);
        
	      var modal = document.getElementById("ver");
			modal.style.display = "block";

	});
	
}
//modificar Validacion
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");

const expresiones={
	precio: /^\d{1,6}$/,
	telefono: /^\d{8,10}$/,
	habitaciones: /^\d{1,20}$/,
	descripcion: /^[a-zA-Z0-9\s]{1,20}$/,
	direccion: /^[a-zA-Z0-9\s]{1,20}$/

}

const campos={
	precio:false,
	telefono:false,
	habitaciones:false,
	descripcion: false,
	direccion:false
}

const validarForm = (e)=>{
  switch (e.target.name){
	  case "price":
	    validarCampo(expresiones.precio, e.target,'precio','precio');
		
	  break;

	  case "phone":
		validarCampo(expresiones.telefono, e.target,'phone','telefono');
	  break;

	  case "numberOfRooms":
	    validarCampo(expresiones.habitaciones, e.target,'rooms','habitaciones');
	  break;

	  case "address":
		validarCampo(expresiones.direccion, e.target,'address','direccion');
	  break;

	  case "description":
		validarCampo(expresiones.descripcion, e.target,'description','descripcion');
	  break;

  }
}

const validarCampo = (expresion, input, campo, nombre)=>{

	if(expresion.test(input.value)){
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');    
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[nombre]=true;
        
	}else{
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');  
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');  
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[nombre]=false;
		
	}
}

inputs.forEach((input) =>{
     input.addEventListener('keyup',validarForm);
	 input.addEventListener('blur',validarForm);
});

textA.forEach((input) =>{
	input.addEventListener('keyup',validarForm);
	input.addEventListener('blur',validarForm);
});

formulario.addEventListener('submit',(e)=>{
	e.preventDefault();


	if(campos.precio && campos.telefono
		 && campos.habitaciones ){

	      modify(); 

	}else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		
	}
});
//-------------------------------------------------------------------------------------------------------------------
function ListarHoteles() {
	let espanol= {
			processing: "Tratamiento en curso...",
			search: "Buscar&nbsp;:",
			lengthMenu: "Agrupar de MENU items",
			info: "Mostrando del item START al END de un total de TOTAL ",
			infoEmpty: "No existen datos.",
			infoFiltered: "(filtrando de MAX elementos en total)",
			infoPostFix: "",
			loadingRecords: "Cargando...",
			zeroRecords: "No se encontraron datos en tu busqueda",
			emptyTable: "No hay datos disponibles en la tabla",
			paginate: {
				first: "Primero",
				previous: "Anterior",
				next: "Siguiente",
				last: "Ultimo"
			},
			aria: {
				sortAscending: ": active para ordenar la columna en forma ascendente",
				sortDescending: ": active para ordenar la colunma en orden descendente"
			}

		}
		
		$('#table').dataTable().fnDestroy();
		
	$.getJSON('/hoteles/listaHoteles', function(data) {
       
	$('#table').DataTable({
		"data": data,
		"columns": [
			 {"data": "code"},
			 {"data": "sucursal.ciudad"},
			 {"data": "numberOfRooms"},
			 {"data": "price"},
			 {"data": "address"},
			{"defaultContent": '<button class="button button-send"><i class="far fa-address-card"></i></button> '},
			{"defaultContent":'<button class="button button-edit"><i class="far fa-edit"></i></button>'},
			{"defaultContent":'<button class="button button-delete"><i class="fas fa-trash-alt"></i></button> '},
			
		],
		"language": espanol,
		lengthMenu: [[5, 10, -1], [5, 10, "All"]],

	});
	
	});
}

