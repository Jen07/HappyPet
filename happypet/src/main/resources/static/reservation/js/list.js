$(document).ready(function () {
	document.getElementById("s1").style.background = '#BC4944';
	document.getElementById("s3").style.background = '#BC4944';
	listado();
});
//LISTADO Reservaciones 
function listado() {

	idUser = document.getElementById("idUser").value;

	$.getJSON("/reservaciones/list/" + idUser, function (list) {
		var html = '';

		if (list.length == 0) {
			html += '<h1>No hay reservaciones</h1>'
		} else {
			list.forEach(r => {
				html += '<div class="col s3 m-1">';
				html += '<div class="cardH">';
				html += '<ul >';
				html += '<li ><label> Nombre Dueño:     ' + r.user.name + ' </label></li> ';
				html += '<li ><label> Mascota:     ' + r.animal.name + ' </label></li> ';
				html += '<li ><label> Hotel:    ' + r.hotel.sucursal.ciudad + '   </label></li>';
				html += '<li ><label>Fecha llegada:   ' + r.entryDate + ' </label></li>';
				html += '<li ><label>Fecha Salida:     ' + r.departureDate + ' </label></li>';
				html += '<li ><label>Precio a pagar por dia:     ' + r.hotel.price + ' </label></li>';
				html += '</ul>';
				html += '</div>';
				html += '</div>';
			});
		}
		$('.reserv').html(html);
	});

}


