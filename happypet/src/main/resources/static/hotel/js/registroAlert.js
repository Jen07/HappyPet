
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");

const expresiones={
	precio: /^\d{1,6}$/,
	telefono: /^\d{8,10}$/,
	habitaciones: /^\d{1,20}$/,
	descripcion: /^[a-zA-Z{À-ÿ0-9\s]{1,40}$/,
	direccion: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/
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
	
		if(nombre != 'descripcion' && nombre != 'direccion'){  
		  document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		  document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
	      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	    }
		campos[nombre]=true;
		
	}else{
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); 
        
        if(nombre != 'descripcion' && nombre != 'direccion'){ 
	    	document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');  
	    	document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
	    	document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
	 	}
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

	if(campos.precio && campos.telefono && campos.habitaciones
		 && campos.descripcion && campos.direccion){

		 registrar(); 

	}else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		
	}
});


function registrar() {
     
	var hotel = {

		code: $('#codSucursal').val(),
		numberOfRooms: $('#numberOfRooms').val(),
		price: $('#price').val(),
		phone: $('#phone').val(),
		address: $('#address').val(),
		description: $('#description').val()

	};

	$.ajax({
		url: "/hoteles/save",
		data: JSON.stringify(hotel),
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function(result) {
  
               Swal.fire({
				icon: 'success',
				text: "Registrado Exitosamente",
				showConfirmButton: false,
				timerProgressBar: true,
				timer: 2000,
			}).then((result)=>{
				  formulario.reset();
				  document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) =>{
					  icono.classList.remove('formulario__grupo-correcto');
				  });
				 
			})

			
		},
		error: function(errorMessage) {
			alert(errorMessage.responseText);
		}
	});


}

 

