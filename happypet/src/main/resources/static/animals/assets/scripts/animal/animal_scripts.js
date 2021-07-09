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
                    title: `Se eliminó con exitosamente!`,
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
    fetch(`/animal/delete/${id}`).then((response) => {
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

const getAnimalsFiltered = (filter, value) => {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/get_All`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {

        // Se reinicia el images para cargarlo con nuevos datos.
        // Solo al eliminar y agregar.
        animalsPG = [];
        animalsTD = [];

        loadRows([...JSON.parse(info.target.response)]);
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

        animalsPG = [];
        animalsTD = [];

        loadRows([...JSON.parse(info.target.response)]);

    });
}

function resetTable() {
    animalsPG = [];
    animalsTD = [];

    getAnimals();
}

/*---------------------------------------------------------------------------------------------------------- */

/*
    Trae todos los animales del servidor
*/

// Contenido de la tabla
const content = document.getElementById("contenido");
// Contenedor de paginas.
let animalsPG = [];
//Contenedor de filas.
let animalsTD = [];
// Registros por pagina.
let perPage = 5;

// Obtiene los animales y los envia a convertir a HTML
const getAnimals = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/animal/get_All`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        loadRows([...JSON.parse(info.target.response)]);
    });
}

// Carga las filas.
// Recibe un JSON del objeto a convertir en HTML.

let actualPage = 0;

const loadRows = (animalsArray) => {
    content.innerHTML = "";
    control = 0;

    if (animalsArray.length == 0) {
        content.innerHTML += '<td colspan="5" class="ta-center">No hay que mostrar.</td>'
    } else {

        // Recorro al reves para dejar primero los registros nuevos.
        for (let i = animalsArray.length - 1; i >= 0; i--) {
            animalsTD.push(appendAnimal(animalsArray[i]));
            control++;

            // Si control llego al limite por pagina creamos una nueva
            if (control == perPage) {
                animalsPG.push(animalsTD);
                animalsTD = [];
                control = 0;
            }
        }

        // Si la pagina esta vacia no se pone
        if (animalsTD.length > 0) {
            animalsPG.push(animalsTD);
        }

        animalsTD = [];
        control = 0;

        changePage(actualPage);
    }
}

// Metodo que se coloca en el boton, recibe la pagina a la cual ir.
const changePage = (page) => {

    // Si se elimino el ultimo registro de una pagina no se podra  
    // acceder a esta entonces se reduce en 1 el numero de pagina.
    if (page >= animalsPG.length) {
        page--;
    }

    actualPage = page;

    // Limpia la tabla
    content.innerHTML = "";

    // Asigna el contenido de la pagina indicada



    for (let i = 0; i < animalsPG[page].length; i++) {
        content.innerHTML += animalsPG[page][i];
    }
    setButtons();
}

const setButtons = () => {
    // Obtenemos el contenedor de botones
    let buttons = document.getElementById('pagging');
    buttons.innerHTML = '';

    // Asignamos un boton para cada pagina de la matriz.
    for (let i = 0; i < animalsPG.length; i++) {
        buttons.innerHTML += `<a onclick="changePage(${i})" class="btn-send bDetail pagging ${i == actualPage ? 'activeButton' : ''}">${i + 1}</a>`
    }
}

// Crea el HTML apartir del JSON.
const appendAnimal = (animal) => {
    let row = ` 
            <tr  id="${animal.id}">
            <td>
            ${animal.owner == null ? 'N/A' : animal.owner}
            </td>
            <td>${animal.name == "" ? 'N/A' : animal.name}</td>
            <td>${animal.specie}</td>
            <td>${animal.breed}</td>
            <td id="buttonsAcions">
            <div class="row justify-center">
            <a class=" btn-send bDetail" onClick="getDetails(${animal.registerId})">
            <i class="far fa-address-card"></i></a>
            <a class=" btn-edit bEdit"
            onClick="getDetails(window.location.href = '/animal/modify_form?id=${animal.registerId}')">
            <i class="far fa-edit"></i></a>
            <a class=" btn-delete bDelete" onClick="deleteAlert(${animal.registerId})">
            <i class="fas fa-trash-alt"></i></a>
            </div>
            </td>
            </tr>
                `
    return row;
}

// Evento de cambio de cantidad de registros por pagina.
document.getElementById("peerPage").addEventListener("change", (e) => {
    perPage = e.target.value;
    animalsPG = [];
    animalsTD = [];
    getAnimals();
})

getAnimals();