function inicio(){
	listar();
    document.getElementById("op2").style.background='#BC4944';
    document.getElementById("op3").style.background='#BC4944';
}

function listar(){
	$.getJSON('/employee/listar', function (lista) {
		$('#contenido').empty();
		const tabla = document.querySelector('#table tbody');
		lista.forEach(e => {
			const fila = document.createElement('tr');
			fila.innerHTML += `
				<td>${e.id}</td>
				<td>${e.name}</td>
				<td>${e.lastName}</td>
                <td>${e.type}</td>  
			    <td id="buttonsAcions">

				<button type="button" class="btn-detail bDetail" name="btn-detail" onclick="bDetail(${e.id})">
				<i class="far fa-address-card fa-lg"></i></button>

					<a href="/employee/getEdit?id=${e.id}">
					<button type="button" class="bEdit btn-edit" name="btn-edit">
					<i class="far fa-edit fa-lg"></i></button></a>
							
				<button type="button" class="btn-delete bDelete" onclick="bDelete(${e.id})">
				<i class="fas fa-trash-alt fa-lg"></i></button>
			</td>`;
			tabla.appendChild(fila);
		});
	})
}

function bEdit(id){
	
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getEdit", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);
}

/* Devuelve un html Para mostrar toda la informacion del emplado */
function bDetail(id) {	
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/employee/detail", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            Swal.fire({
                html: xhttp.responseText,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Volver'
            })
        }
    }
}

/*Elimina al empleado pero antes muestra mensaje de verificación 
y actualiza solo la tabla sin recargar la paguina */
function bDelete(id) {

    Swal.fire({
        title: '¿Estas seguro de eliminar al Empleado ?',
        text: "Esta acción es definitiva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí,Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/employee/delete", true);
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
                        showConfirmButton: true,
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

xhttp.open("POST", "/employee/search2", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + text+"&filtro="+filtar);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            div.innerHTML = xhttp.responseText;
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


function filtrar(){
    var text = document.getElementById("search").value;
    var div = document.getElementById("contenedor");
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/employee/search", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + text);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            div.innerHTML = xhttp.responseText;
        }
    };
}