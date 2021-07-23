window.onload = function () {
    document.getElementById("an6").style.background = '#BC4944';
    document.getElementById("op9").style.background = '#BC4944';
}

function imagen() {

    var selectedImage = document.getElementById("imaName").value;
    if (selectedImage != "") {
        Swal.fire({
            html: ` <div  ">
        <img src="/users/imageEmployee/${selectedImage}"></img></div>`,
            confirmButtonColor: '#80BD5D',
            confirmButtonText: 'Volver',
        })
    }
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal2() {
    var modal = document.getElementById("myModalPassword");
    modal.style.display = "none";
}

function openModal2() {
    var modal = document.getElementById("myModalPassword");
    modal.style.display = "block";
}


var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("hola");
    //Ingrese su contrseña para guardar los cambios
    var passw = document.getElementById("user-password").value;
    console.log(passw);
    Swal.fire({
        title: 'Ingrese su contrseña para guardar los cambios',
        showCancelButton: true,
        confirmButtonText: 'Verificar',
        showLoaderOnConfirm: true,
        html: `<div class=" input-field">
        <i class="fas fa-lock"></i>
       <input type="password" placeholder="Contraseña" name="password" id="password" minlength="4" maxlength="12"
            required="required">
        </div> `,

    }).then((result) => {
        if (result.isConfirmed) {
            var password = document.getElementById("password").value;
            console.log(password);
            if (passw === password) {

                var datos = new FormData();

                datos.append("name", document.getElementById("name").value);
                datos.append("lastName", document.getElementById("lastName").value);
                datos.append("id", document.getElementById("user-id").value);
                datos.append("tel", document.getElementById("phone").value);
                datos.append("passw", document.getElementById("user-password").value);
                datos.append("mail", document.getElementById("mail").value);
                datos.append("address", document.getElementById("address").value);

                if (document.getElementById("ima").value != '') { // edita la imagen
                    console.log("CON IMAGEN");

                    reduceFileSize(document.getElementById('ima').files[0], 500 * 1024, 1000, Infinity, 0.9, blob => {
                        datos.append('ima', blob, blob.name || "file.jpg");

                        $.ajax({
                            type: "POST",
                            url: '/perfil/edit',
                            data: datos,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                if (data === "Listo") {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Se modifico Correctamente',
                                        showConfirmButton: false,
                                        timerProgressBar: true,
                                        timer: 2000,
                                    }).then((result) => {
                                        window.location.href = `/perfil`;
                                    });
                                }
                            },
                            error: function (data) {
                                alert("ERROR TEMPOTAL");
                            }
                        });
                    });
                } else {
                    datos.append("oldImage", document.getElementById("oldimagen").value);
                    console.log("SIN IMAGEN");
                    $.ajax({
                        type: "POST",
                        url: '/perfil/edit2',
                        data: datos,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            if (data === "Listo") {
                                Swal.fire({
                                    position: '',
                                    icon: 'success',
                                    title: 'Se modifico Correctamente',
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then((result) => {
                                    window.location.href = `/perfil`;
                                });
                            }
                        },
                        error: function (data) {
                            console.log(data);
                            alert("ERROR TEMPOTAL");
                        }
                    });
                }
                console.log("Termina");
                //********************************** */
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contraseña Incorrecta!',
                    footer: '<div>Intente de nuevo!</div>'
                })
            }
        }
    })
});;

function editar() {
    openModal();
}

function changePassw() {
    openModal2();
}

// Cuanto toca boton agregar con los campos ya correctos
function registrar() {
    var datos = new FormData();

    datos.append("name", document.getElementById("user-name").value);
    datos.append("lastName", document.getElementById("user-lastName").value);
    datos.append("id", document.getElementById("user-id").value);
    datos.append("tel", document.getElementById("user-phone").value);
    datos.append("passw", document.getElementById("user-password").value);
    datos.append("mail", document.getElementById("user-mail").value);
    datos.append("address", document.getElementById("user-address").value);

    if (document.getElementById("ima").value != '') { // edita la imagen

        reduceFileSize(document.getElementById('ima').files[0], 500 * 1024, 1000, Infinity, 0.9, blob => {
            datos.append('ima', blob, blob.name || "file.jpg");

            $.ajax({
                type: "POST",
                url: '/client/edit',
                data: datos,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data === "Listo") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Se modifico Correctamente',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2000,
                        }).then((result) => {
                            window.location.href = `/client/inicio`;
                        });
                    }
                },
                error: function (data) {
                    alert("ERROR TEMPOTAL");
                }
            });
        });
    } else {
        datos.append("oldImage", document.getElementById("oldimagen").value);

        $.ajax({
            type: "POST",
            url: '/client/edit2',
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Listo") {
                    Swal.fire({
                        position: '',
                        icon: 'success',
                        title: 'Se modificó Correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then((result) => {
                        window.location.href = `/client/inicio`;
                    });
                }
            },
            error: function (data) {
                console.log(data);
                alert("ERROR TEMPOTAL");
            }
        });
    }
    console.log("Termina");
}

function listener(event) {

    let inputFile = document.getElementById("ima");
    let fileName = document.getElementById("file-name");

    console.log(inputFile);
    let uploadedFileName = event.target.files[0].name;
    let vari = uploadedFileName.split('.');

    if (vari[vari.length - 1] == "png" || vari[vari.length - 1] == "jpg" || vari[vari.length - 1] == "jpeg") {
        fileName.textContent = uploadedFileName;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Solo se permiten imágenes',
            timer: 2000
        });
        fileName.textContent = "ninguno";
        document.getElementById("ima").value = "";
    }
}

/**  contraseña */

var formulario2 = document.getElementById("formulario2");
formulario2.addEventListener("submit", function (e) {
    e.preventDefault();

    var pass = document.getElementById("user-password").value;
    var passwordA = document.getElementById("passwordA").value;

    if (passwordA === pass) {
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        var id = document.getElementById("user-id").value;
        var xhttp = new XMLHttpRequest();

        if (password1 === password2) {
            Swal.fire({
                title: '¿Está seguro de cambiar la contraseña?',
                showDenyButton: true,
                confirmButtonText: `Sí`,
                denyButtonText: `No`,
                footer: '<h3 style="color:red">La sesión se cerrará,tendrá que volver a iniciar sesión</h3>'
            }).then((result) => {
                if (result.isConfirmed) {
                    xhttp.open("POST", "/password", true);
                    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhttp.send("id=" + id + "&password=" + password1);
                
                    xhttp.onreadystatechange = function () {
                        var res = xhttp.responseText;
                        console.log(res);
                       
                        if (xhttp.readyState == 4 && xhttp.status === 200) {
                         
                            if (res === "Listo") {
                                Swal.fire({
                                    position: '',
                                    icon: 'success',
                                    title: 'Se modificó correctamente!',
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                }).then((result) => {
                                    closeModal2();
                                    window.location.href = `/`;
                                });
                            }
                        }
                    }
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden!',
                footer: '<div>Intente de nuevo!</div>'
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Su contraseña actual no coincide!',
            footer: '<div>Intente de nuevo!</div>'
        })
    }


});
