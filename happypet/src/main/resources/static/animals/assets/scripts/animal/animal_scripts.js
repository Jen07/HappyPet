
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

function resetTable2() {
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

// Validar por que no esta eliminando
function resetTable() {
    getAnimals();
}


const getAnimals = () => {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/get_All`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {

        // Se reinicia el images para cargarlo con nuevos datos.
        // Solo al eliminar y agregar.
        animalsTD = [];

        setTable([...JSON.parse(info.target.response)]);
    });
}

let animalsTD = [];
const content = document.getElementById("contenido");

const setTable = (animalsArray) => {
    content.innerHTML = "";

    let pages = Math.ceil(animalsTD.length / 5);

    if (animalsArray.length == 0) {
        content.innerHTML += '<td class="ta-center">No hay imagenes que mostrar.</td>'
    } else {

        animalsArray.forEach(animal => {
            animalsTD.push(appendAnimal(animal));
        });

        for (let i = 0; i < animalsTD.length; i++) {
            content.innerHTML += animalsTD[i];
        }
    }
}

const appendAnimal = (animal) => {
    let row = ` 
                      <tr  id="${animal.id}">
                        <td>
                            ${animal.registerId == 0 ? 'N/A' : animal.owner}
                        </td>
                        <td>${animal.name == "" ? 'N/A' : animal.name}</td>
                        <td>${animal.specie}</td>
                        <td>${animal.breed}</td>
                        <td id="buttonsAcions">
                            <div class="row justify-center">
                                <a class=" btn-send bDetail" onClick="getDetails(${animal.registerId})"><i
                                        class="far fa-address-card"></i></a>
                                <a class=" btn-edit bEdit"
                                    onClick="getDetails(window.location.href = '/animal/modify_form ? id = ${animal.registerId}')">
                                    <i class="far fa-edit"></i></a>
                                <a class=" btn-delete bDelete" onClick="deleteAlert(${animal.registerId})"><i
                                        class="fas fa-trash-alt"></i></a>
                            </div>
                        </td>
                    </tr>
                `
    return row;

}

getAnimals();