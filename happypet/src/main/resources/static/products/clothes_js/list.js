function inicio() {
    listar();
    document.getElementById("op5").style.background='#BC4944';
    document.getElementById("op6").style.background='#BC4944';
 }

 function listar() {
    $.getJSON('/clothes/listar', function(lista) {
        $('#contenido').empty();
		
        const tabla = document.querySelector('#table tbody');
        lista.forEach(p => {
            const fila = document.createElement('tr');
            fila.innerHTML += `
				<td>${p.cod_product}</td>
				<td>${p.name}</td>
				<td>${p.price}</td>
                <td>${p.type_animal}</td>  
			    <td id="buttonsAcions">

				<button type="button" class="btn-detail bDetail" name="btn-detail" onclick="bDetail(${p.cod_product})">
				<i class="far fa-address-card fa-lg"></i></button>

					<a href="/employee/getEdit?id=${p.cod_product}">
					<button type="button" class="bEdit btn-edit" name="btn-edit">
					<i class="far fa-edit fa-lg"></i></button></a>
							
				<button type="button" class="btn-delete bDelete" onclick="bDelete(${p.cod_product})">
				<i class="fas fa-trash-alt fa-lg"></i></button>
			</td>`;
            tabla.appendChild(fila);
        });
    })
}

function bDetail(codigo) {	
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/clothes/detail", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("codigo=" + codigo);

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

function bDelete(codigo) {
	Swal.fire({
        title: 'Estas seguro de eliminar este producto?',
        text: "Esta acción es definitiva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/clothes/delete", true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.send("codigo=" + codigo);
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