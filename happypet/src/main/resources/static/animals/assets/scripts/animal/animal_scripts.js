window.addEventListener("load", startup);

function startup() {
    addListeners();
    prepareDatatable();
}

function addListeners() {
    let table = document.getElementById("animalTable");
    table.addEventListener("click", (e) => { onTable(e) });
}

function onTable(e) {

    let selectedId = e.target.parentElement.parentElement.id;

    // Boton de detalles
    if (e.target.classList[1] == "btn-send") {
        detailsAlert(selectedId);
    }

    // Boton de edicion
    if (e.target.classList[1] == "btn-edit") {
        window.location.href = `/animal/modify_form?id=${selectedId}`;
    }

    // Boton de eliminacion
    if (e.target.classList[1] == "btn-delete") {
        deleteAlert(selectedId);
    }
}

const deleteAlert = async (selectedId) => {

    let animalName = await bringAnimal(selectedId)

    Swal.fire(
        {
            title: `Quieres eliminar al animal ${animalName}?`,
            text: "Esta accion es irreversible!",
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#80BD5D',
            cancelButtonColor: '#D8524E',
            confirmButtonText: 'Si, eliminarlo!'
        }
    ).then((result) => {

        if (result.isConfirmed) {

            prepareDeleate(selectedId);

            Swal.fire(
                {
                    title: `Eliminado exitosamente`,
                    text: "El animal ha sido eliminado.",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#80BD5D',
                    confirmButtonText: 'Confirmar!'
                }
            )
        }
    })
}

const detailsAlert = async (selectedId) => {
    console.log(selectedId);
    animal = await bringDetails(selectedId);

    Swal.fire(
        {
            html: animal,
            confirmButtonColor: '#80BD5D',
            confirmButtonText: 'Volver'
        }
    )
}

// Prepara la eliminacion luego de confirmar
function prepareDeleate(id) {
    fetch(`/animal/delete/?id=${id}`).then((response) => {
        resetTable();
    })
}

const bringAnimal = async (id) => {
    response = await fetch(`/animal/get_animal/${id}`);
    return await response.text();
}

const bringDetails = async (id) => {
    response = await fetch(`/animal/cover_details/${id}`);
    return await response.text();
}

