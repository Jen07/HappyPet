


document.addEventListener( 'DOMContentLoaded', function () {
	new Splide( '#image-slider', {
		rewind     : true,
		heightRatio: 0.6,
		pagination : false,
		autoplay    : true,
		pauseOnHover: false,
		
	} ).mount();



	getRegisteredBranches();
} );


function getRegisteredBranches(){
	
	

	$.getJSON('/sucursales/listSucursal', function(result) {
			const $select = document.querySelector("#listSucursales");
		for (var i = 0; i < result.length; i++) {

			const option = document.createElement('option');
			option.value = result[i].cedulaJuridica;
			option.text = result[i].ciudad;
			$select.appendChild(option);

		}

	});
}