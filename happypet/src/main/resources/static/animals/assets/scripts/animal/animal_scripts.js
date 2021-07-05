
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


function getAnimals() {

}



function changeFilter() {
    let filterBy = document.getElementById("filterBy").value;
    let filterContainer = document.getElementById("filterContainer");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/reset_filter?filterBy=${filterBy}`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        filterContainer.innerHTML = info.target.response;
    });
}

function filterTable() {
    let filterBy = document.getElementById("filterBy").value;
    let filter = document.getElementById("filterContent").value;
    let table = document.getElementById("animalTable");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/filter_table?filterBy=${filterBy}&filter=${filter}`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        table.innerHTML = info.target.response;
        prepareDatatable();
    });
}

function resetTable() {
    let filterBy = "Nombre";
    let filter = "";
    let table = document.getElementById("animalTable");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/filter_table?filterBy=${filterBy}&filter=${filter}`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        table.innerHTML = info.target.response;
      
    });

}