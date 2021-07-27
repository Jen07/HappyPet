$(document).ready(function () {
	document.getElementById("op8").style.background='#BC4944';
    document.getElementById("op10").style.background='#BC4944';
});

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textA = document.querySelectorAll("#formulario textarea");


/*Validaciones numericas y mascaras  */
 

$("#price").keypress(function () {
    const number = document.querySelector('#price');
    number.addEventListener('keyup', (e) => {
            const element = e.target;
            const value = element.value;
            element.value = formatNumber(value);
    });
});


 function formatNumber(n) {
     n = String(n).replace(/\D/g, "");
     return n === '' ? n : Number(n).toLocaleString(['ban', 'id']);
 }

 $('#price').keypress(function (tecla) {
     if (tecla.charCode < 48 || tecla.charCode > 57) {
        return false;
     }
 }); 

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
//-----------------------------------------------------------------------------------------------------

//VALIDACIONES DE CAMPOS 

const expresiones={
	precio: /^[0-9\.]{4,12}/,
	telefono: /^[0-9\-]{9,9}/,
	habitaciones: /^\d{1,20}$/,
	descripcion: /^[a-zA-Z0-9Á-ÿ\s\-\.\ñ\_\#\,]{4,150}$/,
	direccion: /^[a-zA-Z0-9Á-ÿ\s\-\.\ñ\_\#\,]{4,150}$/
}

const campos={
	price:false,
	phone:false,
	rooms:false,
	address:false,
	description: false
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

		 registrar(); 

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


//--------------------------------------------------------------------------------------------------------
//REGISTRAR

function quitar() {
    var price = document.getElementById("price").value;
    while (price.toString().indexOf(".") != -1)
        price = price.toString().replace(".", "");
    return price;
}

function registrar() {
     var cedulaJuridica = document.getElementById('codSucursal').value;
	 var price= document.getElementById('price').value;
	 price = quitar();
	var hotel = {
		numberOfRooms: $('#rooms').val(),
		phone: $('#phone').val(),
		address: $('#address').val(),
		description: $('#description').val()

	};
   
	$.ajax({
		url: "/hoteles/save/"+cedulaJuridica+"/"+price,
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
				window.location.href = `/hotel/mostrar`; 
			})

			
		},
		error: function(errorMessage) {
			alert(errorMessage.responseText);
		}
	});


}

 

