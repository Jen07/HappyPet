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

    let selectedId = e.target.parentElement.parentElement.parentElement.id;

    // Boton de detalles
    if (e.target.classList[0] == "btn-send") {
        getDetails(selectedId)
    }

    // Boton de edicion
    if (e.target.classList[0] == "btn-edit") {
        window.location.href = `/animal/modify_form?id=${selectedId}`;
    }

    // Boton de eliminacion
    if (e.target.classList[0] == "btn-delete") {
        deleteAlert(selectedId);
    }
}

const deleteAlert = async (selectedId) => {

    let animalName = await bringAnimal(selectedId)

    Swal.fire(
        {
            title: `Quieres eliminar al animal ${animalName}?`,
            text: "Esta accion es definitiva!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#80BD5D',
            cancelButtonColor: '#D8524E',
            confirmButtonText: 'Si, Eliminar!'
        }
    ).then((result) => {

        if (result.isConfirmed) {

            prepareDeleate(selectedId);

            Swal.fire(
                {
                    title: `Se Elimino con Exito!`,
                    text: "El animal ha sido eliminado.",
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000

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

function getDetails(animal) {

    $.getJSON('/animal/getDetails/' + animal, function (animal) {
        var modal = '';
        modal += '<div class="cardD">';
        modal += '<ul>';
        modal += ' <li> Nombre: <label>' + animal.name + '</label></li>';
        modal += ' <li> Especie: <label>' + animal.specie + '</label></li>';
        modal += ' <li> Raza: <label>' + animal.breed + '</label></li>';
        modal += ' <li> Peso: <label>' + animal.weight + '</label></li>';
        modal += ' <li> Altura: <label>' + animal.height + '</label></li>';
        modal += ' <li> Género:  <label>' + animal.gender + '</label></li>';
        modal += ' <li> Castrado:  <label>' + (animal.neutered ? 'Si' : 'No') + '</label></li>';
        modal += '</ul>';
        modal += '<div>';
        modal += '</div>';

        $('.modal-body').html(modal);
        openModal();


    })
}

function closeModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "none";
}

function openModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "block";
}
