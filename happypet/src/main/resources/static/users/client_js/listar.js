function inicio(){
	listar();
    document.getElementById("op2").style.background='#BC4944';
    document.getElementById("op4").style.background='#BC4944';
}

function listar(){
	$.getJSON('/client/listar', function (lista) {
		$('#contenido').empty();
		const tabla = document.querySelector('#table tbody');
		lista.forEach(c => {
			const fila = document.createElement('tr');
			fila.innerHTML += `
				<td>${c.id}</td>
				<td>${c.name}</td>
				<td>${c.lastName}</td>

			    <td id="buttonsAcions">

                <button type="button" class="btn-detail bDetail" name="btn-detail" 
                onclick="bDetail(${c.id})"><i class="far fa-address-card fa-lg"></i></button>

					<a href="/client/getEdit?id=${c.id}">
					<button type="button" class="bEdit btn-edit" name="btn-edit">
					<i class="far fa-edit fa-lg"></i></button></a>
							
				<button type="button" class="btn-delete bDelete" onclick="bDelete(${c.id})">
				<i class="fas fa-trash-alt fa-lg"></i></button>
			</td>`;
			tabla.appendChild(fila);
		});
	})
}

function bDetail(id){
    $.getJSON('/client/detail/' + id, function(client) {
		var modal = '';
		modal+='<div class="cardD">';
		modal+='<ul>';
		modal+=' <li> Cédula: <label >'+client.id+'</label></li>';
		modal+=' <li> Nombre: <label>'+client.name+'</label></li>';
		modal+=' <li> Apellido: <label>'+client.lastName+'</label></li>';
		modal+=' <li> Tipo: <label>'+client.type+'</label></li>';
		modal+=' <li> Teléfono: <label>'+client.phone+'</label></li>';
		modal+=' <li> Correo: <label>'+client.mail+'</label></li>';
		modal+='<li> Dirreción:  <label>'+client.address+'</label></li>';
		modal+='</ul>';
		modal+='<div>';
		modal+='</div>';
		$('.modal-body').html(modal);
		openModal();
	});
}

function closeModal() {
	var modal = document.getElementById("myModalDetails");
	modal.style.display = "none";
}

function openModal() {
	var modal = document.getElementById("myModalDetails");
	modal.style.display = "block";
}


function bEdit(id){
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getEdit", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);
}

/*Elimina al empleado pero antes muestra mensaje de verificación 
y actualiza solo la tabla sin recargar la paguina */
function bDelete(id) {

    Swal.fire({
        title: '¿Estas seguro de eliminar al Empleado ?',
        text: "Esta acción es definitiva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#80BD5D',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí,Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/client/delete", true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.send("id=" + id);
			var res=xhttp.responseText;
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status === 200) {
				if(res="Elimino"){
                    Swal.fire({
                        position: '',
                        icon: 'success',
                        title: 'Se Elimino con Exito!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    listar();
                }
               }
            }
        }
    })
}


function bSearch(){
var filtar = document.getElementById("cxBuscar").value;
var text = document.getElementById("search").value;
var div = document.getElementById("contenedor");
var xhttp = new XMLHttpRequest();

xhttp.open("POST", "/client/search", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + text+"&filtro="+filtar);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            div.innerHTML = xhttp.responseText;
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
        listar();
    }
}