const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");


const expresiones={
	CedulaJuridica: /[0-9+-]{12}/,
	correo: /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/,
	telefono: /[0-9+-]{9}/,
	horaInicio: /^[0-9]/,
	horaFinal: /^[0-9]/,

}

var campos={
	CedulaJuridica:false,
	correo:false,
	telefono:false,
	horaInicio: false,
	horaFinal:false
}

const validarForm = (e)=>{
  switch (e.target.name){
	  case "CedulaJuridica":
	    validarCampo(expresiones.CedulaJuridica, e.target,'CedulaJuridica','CedulaJuridica');
		
	  break;

	  case "correo":
		validarCampo(expresiones.correo, e.target,'correo','correo');
	  break;

	  case "telefono":
	    validarCampo(expresiones.telefono, e.target,'telefono','telefono');
	  break;

	  case "horaInicio":
		validarCampo(expresiones.horaInicio, e.target,'horaInicio','horaInicio');
	  break;

	  case "horaFinal":
		validarCampo(expresiones.horaFinal, e.target,'horaFinal','horaFinal');
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



