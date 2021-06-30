window.addEventListener("load", startup);

function startup() {
    addListeners();
}

function addListeners() {
    let table = document.getElementById("imagesTable");
    table.addEventListener("click", (e) => { onTable(e) });
}

function onTable(e) {

    // Boton de detalles
    if (e.target.classList[1] == "btn-send") {
        let selectedImage = e.target.parentElement.parentElement.children[0].innerHTML;
        detailsAlert(selectedImage);
    }

    // Boton de eliminacion
    if (e.target.classList[1] == "btn-delete") {
        let selectedId = e.target.parentElement.parentElement.children[0].id;
        deleteAlert(selectedId);
    }
}

const deleteAlert = async (selectedId) => {

    Swal.fire(
        {
            title: `Quieres eliminar esta foto?`,
            text: "Esta accion es irreversible!",
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
                    confirmButtonColor: '#80BD5D',
                    confirmButtonText: 'Confirmar!'
                }
            )
        }
    })
}

const detailsAlert = (selectedImage) => {
    Swal.fire(
        {
            html: selectedImage,
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
    let id = document.getElementById("opt").value;
    let table = document.getElementById("imagesTable");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/get_images_table?id=${id}`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        table.innerHTML = info.target.response;

    });
}

const mountForm = async () => {

    form = await bringForm();

    Swal.fire(
        {
            html: form,
            confirmButtonColor: '#80BD5D',
            confirmButtonText: 'Volver'
        }
    )

    setPreviewer();
};


const bringForm = async () => {
    const id = document.querySelector('body').id;
    response = await fetch(`/animal/get_images_form/${id}`);
    return await response.text();
}


