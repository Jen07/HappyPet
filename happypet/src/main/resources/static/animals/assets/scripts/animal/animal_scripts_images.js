window.addEventListener("load", startup);
const content = document.getElementById("contenido");

let actualPage = 1;
let imagesTD = [];

function startup() {
    addListeners();
}

function addListeners() {
    let table = document.getElementById("imagesTable");

}



const deleteAlert = async (selectedId) => {

    Swal.fire(
        {
            title: `Quieres eliminar esta foto?`,
            text: "Esta accion es definitiva!",
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

const detailsAlert = (selectedImage) => {
    Swal.fire(
        {
            html: `<img src="${selectedImage}"\>`,
            confirmButtonColor: '#80BD5D',
            confirmButtonText: 'Volver'
        }
    )
}

// Prepara la eliminacion luego de confirmar
function prepareDeleate(id) {
    fetch(`/animal/delete_image?id=${id}`).then((response) => {
        resetTable();
    })
}

function resetTable() {
    getImages();
}

const submitImage = () => {

    if (document.animal_form.file.value == "") {
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

        makeSend();
        document.getElementById('file-preview').innerHTML = '';
        document.animal_form.reset();
        closeModal();

        setTimeout(function () {
            resetTable();
        }, 75);

        setTimeout(function () {
            resetTable();
        }, 75);


    }
}



function closeModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "none";
}

function openModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "block";
}


const getImages = () => {
    let id = document.getElementById("opt").value;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/get_animal_images/${id}`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {

        // Se reinicia el images para cargarlo con nuevos datos.
        // Solo al eliminar y agregar.
        imagesTD = [];

        setTable([...JSON.parse(info.target.response)]);
    });
}


const setTable = (imagesArray) => {
    content.innerHTML = "";

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
         <img src= "/animal/build_image/ + ${id}"  class="animal-img">
       </div>
    </div>
    <div class="row justify-evenly">
    <div class="col s5">
    <a class="btn btn-send b-img-Detail" onClick="detailsAlert('/animal/build_image/${id}')">
    <i class="far fa-address-card"></i></a>
    </div>
    <div class="col s5">
    <a class="btn btn-delete b-img-Delete" onClick="deleteAlert(${id})">
    <i class="fas fa-trash-alt"></i></a>
    </div>
    </div >
    </td >
        `
    return row;
}

getImages();








