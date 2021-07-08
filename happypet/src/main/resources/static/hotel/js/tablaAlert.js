var codeModificar;
var ciudadhotel;
$(document).ready(function () {
	document.getElementById("op8").style.background='#BC4944';
    document.getElementById("op10").style.background='#BC4944';
});

//busca el nombre de la ciudad
function obtenerCiudad(idHotel) {
		$.ajax({
			type: "GET",
			url: "/hoteles/obtenerHotel/"+idHotel,
			success: function (result) {
				ciudadhotel=result;
				deleteAlert(idHotel);
			},
			error: function (errorMessage) {
				alert(errorMessage.responseText);
			}
		});
}
//tira el sweetalert de eliminar
function deleteAlert(idHotel) {

	swal.fire({
		title: `Desea eliminar el hotel ${ciudadhotel} ?`,
		text: "Esta acción es definitiva",
		icon: 'warning',
		showCancelButton: true,
		cancelButtonText: "Cancelar",
		confirmButtonColor: '#80BD5D',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, eliminarlo!'
	}).then((result) => {
		if (result.isConfirmed) {
			deleteHotel(idHotel);
		}

	})
}
//Elimina
function deleteHotel(idHotel) {
	$.ajax({
		type: "DELETE",
		url: "/hoteles/delete/" + idHotel,
		cache: false,
		success: function () {
			Swal.fire({
				icon: 'success',
				text: 'El hotel ha sido eliminado.',
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 2000,
			}).then((result) => {
				resetTable();
			})
		},
		error: function (errorMessage) {
			alert("ERROR");
			alert(errorMessage.responseText);
		}
	});

}
//es el modal de modificar
function modal(idHotel) {
	$.ajax({
		type: "Get",
		url: "/hoteles/GetHotel/" + idHotel,
		cache: false,
		success: function (result) {

			llenarSelect(result);
			codeModificar = result.code;
			document.getElementById("price").value = result.price;
			document.getElementById("description").value = result.description;
			document.getElementById("rooms").value = result.numberOfRooms;
			document.getElementById("address").value = result.address;
			document.getElementById("phone").value = result.phone;

			cleanSelect();
			var modal = document.getElementById("myModal");
			modal.style.display = "block";
		},
		error: function (errorMessage) {
			alert(errorMessage.responseText);
		}
	});

}
//cierra los modales
function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
	var modal2 = document.getElementById("ver");
	modal2.style.display = "none";

}
//llena el select de modificar
function llenarSelect(result) {
	$.getJSON("/hoteles/listaSucursales", function (lista) {
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
//limpia el select
function cleanSelect() {

	const $select = document.querySelector("#codSucursal");
	for (let i = $select.options.length; i >= 0; i--) {
		$select.remove(i);
	}
}



//modifica
function modify() {

	var cedulaJuridica = document.getElementById('codSucursal').value;
	var price= document.getElementById('price').value;
	price = quitar();

	var hotel = {
		numberOfRooms: $('#rooms').val(),
		phone: $('#phone').val(),
		address: $('#address').val(),
		description: $('#description').val(),
	};

	$.ajax({
		url: "/hoteles/modify/" + codeModificar+"/"+cedulaJuridica+"/"+price,
		data: JSON.stringify(hotel),
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function (result) {
			Swal.fire({
				icon: 'success',
				text: "Modificado Exitosamente",
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 2000,
			}).then((result) => {
				closeModal();
				resetTable();
			})
		},
		error: function (errorMessage) {
			alert(errorMessage.responseText);
		}
	});

}
//hace la lista que va en detalles
function listado(id) {

	$.getJSON("/hoteles/GetHotel/" + id, function (hotel) {
		var html = '';
		html += '<ul >';
		html += '<li ><label> Ciudad Veterinaria:     ' + hotel.sucursal.ciudad + ' </label></li> ';
		html += '<li ><label># habitaciones:     ' + hotel.numberOfRooms + ' </label></li> ';
		html += '<li ><label>Precio:    ' + hotel.price + '   </label></li>';
		html += '<li ><label>Tel&eacute;fono:   ' + hotel.phone + ' </label></li>';
		html += '<li ><label>Direcci&oacute;n:     ' + hotel.address + ' </label></li>';
		html += '<li ><label>Descripci&oacute;n:    ' + hotel.description + ' </label></li>';
		html += '</ul>';

		$('.body').html(html);

		var modal = document.getElementById("ver");
		modal.style.display = "block";

	});

}

//---------------------------------------------------------------------------------------------------------
//PAGINACIÓN

// Contenido de la tabla
const content = document.getElementById("contenido");
// Contenedor de paginas.
let hotelPG = [];
//Contenedor de filas.
let hotelTD = [];
// Registros por pagina.
let perPage = 10;

// Obtiene los hoteles y los envia a convertir a HTML
const gethoteles = () => $.getJSON('/hoteles/listaHoteles', function (json) {
	loadRows(json);
});

// Carga las filas.
// Recibe un JSON del objeto a convertir en HTML.

let actualPage = 0;

const loadRows = (hotelArray) => {
	content.innerHTML = "";
	control = 0;

	if (hotelArray.length == 0) {
		content.innerHTML += '<td colspan="5" class="ta-center">No hay que mostrar.</td>'
	} else {

		// Recorro al reves para dejar primero los registros nuevos.
		for (let i = hotelArray.length - 1; i >= 0; i--) {
			hotelTD.push(appendhotel(hotelArray[i]));
			control++;

			// Si control llego al limite por pagina creamos una nueva
			if (control == perPage) {
				hotelPG.push(hotelTD);
				hotelTD = [];
				control = 0;
			}
		}

		// Si la pagina esta vacia no se pone
		if (hotelTD.length > 0) {
			hotelPG.push(hotelTD);
		}

		hotelTD = [];
		control = 0;

		changePage(actualPage);
	}
}

// Metodo que se coloca en el boton, recibe la pagina a la cual ir.
const changePage = (page) => {

	// Si se elimino el ultimo registro de una pagina no se podra  
	// acceder a esta entonces se reduce en 1 el numero de pagina.
	if (page >= hotelPG.length) {
		page--;
	}

	actualPage = page;

	// Limpia la tabla
	content.innerHTML = "";

	// Asigna el contenido de la pagina indicada

	for (let i = 0; i < hotelPG[page].length; i++) {
		content.innerHTML += hotelPG[page][i];
	}
	setButtons();
}

const setButtons = () => {
	// Obtenemos el contenedor de botones
	let buttons = document.getElementById('pagging');
	buttons.innerHTML = '';

	// Asignamos un boton para cada pagina de la matriz.
	for (let i = 0; i < hotelPG.length; i++) {
		buttons.innerHTML += `<a onclick="changePage(${i})" class="btn-send bDetail pagging ${i == actualPage ? 'activeButton' : ''}">${i + 1}</a>`
	}
}

// Crea el HTML apartir del JSON.
const appendhotel = (lista) => {

	var html = '';
	html += '<tr class="trlist">';
	html += '<td>' + lista.sucursal.ciudad + '</td>';
	html += '<td>' + lista.numberOfRooms + '</td>';
	html += '<td> &#162;' + lista.price + '</td>';
	html += '<td><button type="button" class="btn-detail bDetail far fa-address-card fa-1x" name="btn-detail" onclick="listado(' + lista.code + ')"></button>' +
		'<button type="button" class="bEdit btn-edit far fa-edit fa-1x" name="btn-edit" onclick="modal(' + lista.code + ')" ></class=></button></a>' +
		'<button type="button" class="btn-delete bDelete fas fa-trash-alt fa-1x" onclick="obtenerCiudad(' + lista.code + ')" ></button></td>';
	html += '</tr>';

	return html;
}

// Evento de cambio de cantidad de registros por pagina.
document.getElementById("peerPage").addEventListener("change", (e) => {
	perPage = e.target.value;
	hotelPG = [];
	hotelTD = [];
	gethoteles();
})

gethoteles();

function resetTable() {
    hotelPG = [];
	hotelTD = [];
    gethoteles();

}

//metodo de buscar 
function bSearch(){
	var filtrar = document.getElementById("cxBuscar").value;
	var texto = document.getElementById("search").value;
	var xhttp = new XMLHttpRequest();
	
	xhttp.open("POST", "/hoteles/buscar", true);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("texto=" + texto+"&filtro="+filtrar);
	
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status === 200) {
				hotelPG = [];
				hotelTD = [];
				loadRows([...JSON.parse(xhttp.responseText)]);
			}
			if(xhttp.status !==200){
				alert("Fallas temporales");
			}
		}; 
	}

	//ve si el campo de busqueda esta vacio
function limpiar(){
    var text = document.getElementById("search").value;
    var div = document.getElementById("contenedor");
    var xhttp = new XMLHttpRequest();

    if(text=' '){
        resetTable();
    }
}


//---------------------------------------------------------------------------------------------------------
//modificar Validacion
//VALIDACIONES DE CAMPOS 

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");

const expresiones={
	precio: /^[0-9\.]{4,12}/,
	telefono: /^[0-9\-]{8,10}/,
	habitaciones: /^\d{1,20}$/,
	descripcion: /^[a-zA-Z0-9Á-ÿ\s\-\.\ñ\_\#\,]{4,150}$/,
	direccion: /^[a-zA-Z0-9Á-ÿ\s\-\.\ñ\_\#\,]{4,150}$/
}

const campos={
	price:true,
	phone:true,
	rooms:true,
	address:true,
	description: true
}

const validarForm = (e)=>{
  switch (e.target.name){
	  case "price":
	    validarCampo(expresiones.precio, e.target,'price');
		
	  break;

	  case "phone":
		validarCampo(expresiones.telefono, e.target,'phone');
	  break;

	  case "rooms":
	    validarCampo(expresiones.habitaciones, e.target,'rooms');
	  break;

	  case "address":
		validarCampo(expresiones.direccion, e.target,'address');
	  break;

	  case "description":
		validarCampo(expresiones.descripcion, e.target,'description');
	  break;

  }
}

const validarCampo = (expresion, input, campo)=>{

	if(expresion.test(input.value)){
		
		
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
	
		if(campo != 'description' && campo != 'address'){  
		  document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		  document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
	      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	    }
		campos[campo]=true;
		
	}else{
	
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); 
        
        if(campo != 'description' && campo != 'address'){ 
	    	document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');  
	    	document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
	    	document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
	 	}
	    campos[campo]=false;
		
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

	if(campos.price && campos.phone && campos.rooms
		 && campos.description && campos.address){

		modify()

	}else{
		var divError = document.querySelectorAll(".formulario__grupo");
		
		divError.forEach((input) =>{
			console.dir(input);
			var inputError = document.querySelector(`#${input.id} input`);
		

            if(inputError!=null){
				
	 		  if(!campos[inputError.id]){	
				revalidated(input.id);
			 }
			}else{
				
			   if(!campos.address){
				  revalidated(input.id);
			   }else if(!campos.description){
				   revalidated(input.id);  
			   }
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


function revalidated(campo){
	
		document.getElementById(`${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`${campo}`).classList.remove('formulario__grupo-correcto'); 
		if(campo != 'grupo__description' && campo != 'grupo__address'){
         document.querySelector(`#${campo} i`).classList.add('fa-times-circle');  
         document.querySelector(`#${campo} i`).classList.remove('fa-check-circle');
	   }
}


/*Validaciones numericas y mascaras  */
function formatNum(id, e) {
    const number = document.querySelector("#" + id);

    if (valideKey(e)) {
        const element = e.target;
        const value = element.value;
        element.value = formatNumber(value);
    }

}

//Formato numerico
function formatNumber(number) {
    number = String(number).replace(/\D/g, "");
    return number === '' ? number : Number(number).toLocaleString(['ban', 'id']);
}

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

function quitar() {
    var price = document.getElementById("price").value;
    while (price.toString().indexOf(".") != -1)
        price = price.toString().replace(".", "");
    return price;
}


