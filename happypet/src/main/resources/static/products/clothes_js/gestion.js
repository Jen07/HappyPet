window.onload = function(){
    document.getElementById("op5").style.background = '#BC4944';
    document.getElementById("op6").style.background = '#BC4944';
}

const content = document.getElementById("contenido");
let imagesIdTD ;
let tempo ;


const submitImage = async() => {

    if (document.getElementById("file").value == "") {
        Swal.fire(
            {
                text: `Seleccione una imagen antes de enviar.`,
                position: 'top-right',
                showCancelButton: false,
                showConfirmButton: false,
                confirmButtonColor: '#80BD5D',
                timer: 2000
            }
        )

    } else {

        agregar();

        document.getElementById('file-preview').innerHTML = '';
        document.product_form.reset();
        closeModal();


    }
}

function agregar(){
    console.dir(document.getElementById('file').value);
        var datos = new FormData();

        reduceFileSize(document.getElementById('file').files[0], 500 * 1024, 1000, Infinity, 0.9, blob => {
            datos.append('file', blob, blob.name || "file.jpg");
            datos.append('id',document.getElementById('id').value);

        $.ajax({
            type: "POST",
            url: '/imagenProducts/saveI',
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Agregado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se agregó Correctamente',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2000,
                    }).then((result) => {
                            resetTable();
                    });


                }else {
                   alert("ERROR");
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
}

function resetTable() {
    getImages();
}


function closeModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "none";
}

function openModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "block";
}

/** **************************** */
const getImages = () => {
   
    let id = document.getElementById("id").value;
    const xhr = new XMLHttpRequest();
    const xht = new XMLHttpRequest();

   content.innerHTML = '<td colspan="3" class="ta-center"  style="cursor: progress;">Cargando...</td>';

    xhr.addEventListener("loadend", (info) => {
        imagesTD = [];
        setTable([...JSON.parse(info.target.response)]);
    });

    xhr.open("GET", `/imagenProducts/get_product_images?id=${id}`, true);
    xhr.send();

    xht.addEventListener("loadend", (info) => {
       
        imagesIdTD = JSON.parse(info.target.response);
       
    });

    xht.open("GET", `/imagenProducts/get_id?id=${id}`, true);
    xht.send();
}

/**----------- */

const setTable = (imagesArray) => {
    content.innerHTML = "";
    tempo=imagesArray;
   
    let imagesTD = [];
    let pages = Math.ceil(imagesArray.length / 6);
    let control = 1;
    let row = "";

    if (imagesArray.length == 0) {
        content.innerHTML += '<td class="ta-center">No hay imagenes que mostrar.</td>'
    } else {

        imagesArray.forEach(img => {
            imagesTD.push(appendImage(img));
        });

        for (let i = 0; i < imagesTD.length; i++) {
            row += imagesTD[i];
            if (control % 3 == 0) {
                content.innerHTML += row;
                row = "";
            }
            control++;
        }

        if (imagesTD.length < 3) {
            for (let i = imagesTD.length; i < 3; i++) {
                row += `
                 <td class="animal_images ">
                    <div class="my-1 row s-12 justify-center">   
                 <div class="image_frame">
                </td>
                `
            }
        }

        content.innerHTML += row;
        row = "";

    }
}

const appendImage = (id) => {
    
    let row = ` 
    <td class="animal_images ">
    <div class= "my-1 row s-12 justify-center">
       <div class="image_frame ">

         <img src= "data:image/*;base64,${id}"  class="animal-img">

       </div>
    </div>
    <div class="row justify-evenly">
    <div class="col s5">
    <a class="btn btn-send b-img-Detail" onClick="detailsAlert('${id}')">
    <i class="far fa-address-card"></i></a>
    </div>
    <div class="col s5">
    <a class="btn btn-delete b-img-Delete" onClick="deleteAlert('${id}')">
    <i class="fas fa-trash-alt"></i></a>
    </div>
    </div >
    </td >
        `
    return row;
}

const detailsAlert = (selectedImage) => {

    
    Swal.fire(
        {
            html: `<img src="data:image/*;base64,${selectedImage}" \>`,
            confirmButtonColor: '#80BD5D',
            confirmButtonText: 'Volver'
        }
    )
}


const deleteAlert = async (selectedId) => {
  
    Swal.fire(
        {
            title: `¿Quieres eliminar esta foto?`,
            text: "¡Esta acción es definitiva!",
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#80BD5D',
            cancelButtonColor: '#D8524E',
            confirmButtonText: 'Si, eliminarla!'
        }
    ).then((result) => {

        if (result.isConfirmed) {

            prepareDeleate(selectedId);

            Swal.fire(
                {
                    title: `Eliminada exitosamente`,
                    text: "La foto ha sido eliminada.",
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    confirmButtonColor: '#80BD5D',
                    timer: 2000
                }
            )
        }
    })
}

// Prepara la eliminacion luego de confirmar
function prepareDeleate(id) {
    //console.log(tempo);
    //console.log("/////////////");
    //console.log(imagesIdTD);
    var index=tempo.indexOf(id);
    //console.log("///////Posición a eliminar/////");
    //console.log(index);
    var idIma=imagesIdTD[index];
    //console.log("///////id a eliminar/////");
    //console.log(idIma);

    fetch(`/imagenProducts/deleteI?id=${idIma}`).then((response) => {
        resetTable();
    })
}


getImages();
