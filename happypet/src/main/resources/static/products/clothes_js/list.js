function inicio() {
    getClothes();
    document.getElementById("op5").style.background = '#BC4944';
    document.getElementById("op6").style.background = '#BC4944';
}

function formatNumber(number) {
    number = String(number).replace(/\D/g, "");
    return number === '' ? number : Number(number).toLocaleString(['ban', 'id']);
}

function bDetail(codigo) {
    $.getJSON('/clothes/detail/'+codigo, function (client) { 
        var modal = '';
        modal += '<div class="cardD">';
        modal += '<ul>';
        modal += ' <li> Código:  <label >' + client.cod_product+ '</label></li>';
        modal += ' <li> Nombre: <label>' + client.name + '</label></li>';
        modal += ' <li> Precio:₡<label>' + formatNumber(client.price) + '</label></li>';
        modal += ' <li> Tipo de animal: <label>' + client.type_animal + '</label></li>';
        modal += ' <li> Color: <label>' + client.color + '</label></li>';
        modal += ' <li> Talla: <label>' + client.size + '</label></li>';
        console.log(client.availability);
        if(client.availability){
            modal += ' <li> Disponibilidad: <label>Disponible</label></li>';
        }else{
            modal += ' <li> Disponibilidad: <label>No Disponible</label></li>';
        }
       
        modal += '<li>Descripción:  <label>' + client.description + '</label></li>';
        modal += '</ul>';
        modal += '<div>';
        $('.modal-body').html(modal);
        openModal();
    });
}

function closeModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "none";
}

function openModal() {
    var modal = document.getElementById("myModalDetails");
    modal.style.display = "block";
}

function bDelete(codigo) {
    Swal.fire({
        title: 'Estas seguro de eliminar este producto?',
        text: "Esta acción es definitiva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/clothes/delete", true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.send("codigo=" + codigo);
            var res = xhttp.responseText;
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status === 200) {
                    if (res = "Elimino") {
                        Swal.fire({
                            position: '',
                            icon: 'success',
                            title: 'Se eliminó con correctamente!',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        resetTable();
                    }
                }
            }
        }
    })
}


function bSearch() {
    var filtar = document.getElementById("cxBuscar").value;
    var text = document.getElementById("search").value;
    var div = document.getElementById("contenedor");
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/clothes/search", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + text + "&filtro=" + filtar);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            clothesPG = [];
            clothesTD = [];
            loadRows([...JSON.parse(xhttp.responseText)]);
        }
        if (xhttp.status !== 200) {
            alert("Fallas temporales");
        }
    };
}


//ve si el campo de busqueda esta vacio
function limpiar() {
    var text = document.getElementById("search").value;

    if (text === '') {
        resetTable();
    }
}

/*---------------------------------------------------------------------------------------------------------- */

/*
    Trae todos los empleados del servidor
*/

// Contenido de la tabla
const content = document.getElementById("contenido");
// Contenedor de paginas.
let clothesPG = [];
//Contenedor de filas.
let clothesTD = [];
// Registros por pagina.
let perPage = 5;

// Obtiene los empleados y los envia a convertir a HTML
const getClothes = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/clothes/listar`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        loadRows([...JSON.parse(info.target.response)]);
    });
}

// Carga las filas.
// Recibe un JSON del objeto a convertir en HTML.

let actualPage = 0;

const loadRows = (clothesArray) => {
    content.innerHTML = "";
    control = 0;

    if (clothesArray.length == 0) {
        content.innerHTML += '<td colspan="6" class="ta-center">No hay que mostrar.</td>'
    } else {

        // Recorro al reves para dejar primero los registros nuevos.
        for (let i = clothesArray.length - 1; i >= 0; i--) {
            clothesTD.push(appendClothes(clothesArray[i]));
            control++;

            // Si control llego al limite por pagina creamos una nueva
            if (control == perPage) {
                clothesPG.push(clothesTD);
                clothesTD = [];
                control = 0;
            }
        }

        // Si la pagina esta vacia no se pone
        if (clothesTD.length > 0) {
            clothesPG.push(clothesTD);
        }

        clothesTD = [];
        control = 0;

        changePage(actualPage);
    }
}

// Metodo que se coloca en el boton, recibe la pagina a la cual ir.
const changePage = (page) => {

    // Si se elimino el ultimo registro de una pagina no se podra  
    // acceder a esta entonces se reduce en 1 el numero de pagina.
    if (page >= clothesPG.length) {
        page--;
    }

    actualPage = page;

    // Limpia la tabla
    content.innerHTML = "";

    // Asigna el contenido de la pagina indicada
    for (let i = 0; i < clothesPG[page].length; i++) {
        content.innerHTML += clothesPG[page][i];
    }
    setButtons();
}

const setButtons = () => {
    // Obtenemos el contenedor de botones
    let buttons = document.getElementById('pagging');
    buttons.innerHTML = '';

    // Asignamos un boton para cada pagina de la matriz.
    for (let i = 0; i < clothesPG.length; i++) {
        buttons.innerHTML += `<a onclick="changePage(${i})" class="btn-send bDetail pagging 
        ${i == actualPage ? 'activeButton' : ''}">${i + 1}</a>`
    }
}

// Crea el HTML apartir del JSON.
const appendClothes = (p) => { //&#162
    let row = `
    <td>${p.name}</td>
    <td>${p.size}</td>
    <td>${p.color}</td>
    <td>${p.type_animal}</td>  
    <td id="buttonsAcions">

    <button type="button" class="btn-detail bDetail" name="btn-detail" onclick="bDetail(${p.cod_product})">
    <i class="far fa-address-card fa-lg"></i></button>

        <a href="/clothes/getEdit?id=${p.cod_product}">
        <button type="button" class="bEdit btn-edit" name="btn-edit">
        <i class="far fa-edit fa-lg"></i></button></a>
                
    <button type="button" class="btn-delete bDelete" onclick="bDelete(${p.cod_product})">
    <i class="fas fa-trash-alt fa-lg"></i></button>
</td>`
    return row;
}

// Evento de cambio de cantidad de registros por pagina.
document.getElementById("peerPage").addEventListener("change", (e) => {
    perPage = e.target.value;
    clothesPG = [];
    clothesTD = [];
    getClothes();
})

function resetTable() {
    clothesPG = [];
    clothesTD = [];
    getClothes();
}


