var idU;

//es el modal de form reservaciones
function modalForm(idUser) {

    idU=idUser;
     var address ="/reservaciones/listaAnimals/"+idU;
     var id ="#idAnimal";

    fillSelect(address,id,true);
    cleanSelect(id);
    
    address ="/reservaciones/listaHotels";
    id="#codeHotel";

    fillSelect(address,id,false);
    cleanSelect(id);

    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

//llena el select de modificar
function fillSelect(address,id,type) { // añadir dire como variable 
	$.getJSON(address, function (lista) {
		var select = document.querySelector(id);
		for (var i = 0; i < lista.length; i++) {
			var option = document.createElement("option");

            if(type){
                option.value = lista[i].id;
                option.text = lista[i].name;
            }else{

                option.value = lista[i].code;
			    option.text = lista[i].sucursal.ciudad;
            }
			select.add(option);
		}
	});
}

//limpia el select
function cleanSelect(id) {

	const $select = document.querySelector(id);
	for (let i = $select.options.length; i >= 0; i--) {
		$select.remove(i);
	}
}

//cierra los modales
function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
	var modal2 = document.getElementById("ver");
	modal2.style.display = "none";

}

//Guardar Reservacion
function save(){
      var animal= document.getElementById('idAnimal').value;
      var hotel= document.getElementById('codeHotel').value;
      var dates={
        entryDate: $('#entryDate').val(),
        departureDate: $('#departureDate').val()
      };

      $.ajax({
        url: "/reservaciones/save/"+animal+"/"+hotel+"/"+idU,
		data: JSON.stringify(dates),
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function() {
               Swal.fire({
				icon: 'success',
				text: "Reservación Realizada Exitosamente",
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 2000,
			}).then((result)=>{
				closeModal(); 
			})	
		},
		error: function(errorMessage) {
			alert(errorMessage.responseText);
		}
      });
}
