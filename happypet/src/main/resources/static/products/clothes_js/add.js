window.onload = function(){
    document.getElementById("op4").style.background='#BC4944';
    document.getElementById("op5").style.background='#BC4944';
}

var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    var datos = new FormData();

    datos.append("name", document.getElementById("name").value);
    datos.append("color", document.getElementById("color").value);
    datos.append("price", document.getElementById("price").value);
    datos.append("type", document.getElementById("type").value);
    datos.append("size", document.getElementById("size").value);
    datos.append("availability", document.getElementById("availability").value);
    datos.append("description", document.getElementById("description").value);

    $.ajax({
        type: "POST",
        url: '/clothes/add',
        data: datos,
        processData: false,  
        contentType: false,
        success: function (data) {
            if (data === "Agregado") {
                Swal.fire({
                    position: '',
                    icon: 'success',
                    title: 'Se agregó Correctamente',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `/clothes/inicio`;
                    }
                });
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
    
});