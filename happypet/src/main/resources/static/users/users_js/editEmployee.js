window.onload = function(){
    document.getElementById("op2").style.background='#BC4944';
    document.getElementById("op3").style.background='#BC4944';
}

var formulario=document.getElementById("formulario2");
formulario.addEventListener("submit",function(e){
	e.preventDefault();
	var datos= new FormData();
	
    datos.append("name", document.getElementById("name").value);
    datos.append("lastName", document.getElementById("lastName").value);
    datos.append("id", document.getElementById("id").value);
    datos.append("salary", document.getElementById("salary").value);
    datos.append("tel", document.getElementById("tel").value);
    datos.append("type", document.getElementById("type").value);
    datos.append("passw", document.getElementById("passw").value);
    datos.append("mail", document.getElementById("mail").value);
    datos.append("address", document.getElementById("address").value);
    
    if(document.getElementById("imagen").value != ''){ // edita la imagen
        var file_data = $("#imagen").prop("files")[0];
        datos.append("imagen", file_data);
        //alert("envio");
        $.ajax({
            type: "POST",
            url: '/employee/edit',
            data: datos,
            processData: false,  
            contentType: false,
            success: function (data) {
                // location.reload();
                if (data === "Listo") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se modifico Correctamente',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = `/entry`;
                        }
                    });
                }
            },
            error: function (data) {
                console.log(data);
            }
        });

    }else{
        //alert("vacio : " +  document.getElementById("oldimagen").value +" -");
        datos.append("oldImage", document.getElementById("oldimagen").value);
        $.ajax({
            type: "POST",
            url: '/employee/edit2',
            data: datos,
            processData: false,  
            contentType: false,
            success: function (data) {
                if (data === "Listo") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se modifico Correctamente',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = `/entry`;
                        }
                    });
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
});

let inputFile = document.getElementById("imagen");
let fileName = document.getElementById("file-name");

inputFile.addEventListener('change',function(event){
    let uploadedFileName = event.target.files[0].name;
    let vari=uploadedFileName.split('.');
    if(vari[vari.length-1]=="png" || vari[vari.length-1]=="jpg" || vari[vari.length-1]=="jpeg"){
        fileName.textContent =uploadedFileName;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Solo se permiten imágenes',
            timer: 2000
        });
        fileName.textContent ="ninguno";
        document.getElementById("imagen").value="";
    }
   
});
