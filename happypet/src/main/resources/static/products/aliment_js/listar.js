function inicio() {
   getProduct();
   document.getElementById("op5").style.background='#BC4944';
   document.getElementById("op7").style.background='#BC4944';
}


function formatNumber(number) {
    number = String(number).replace(/\D/g, "");
    return number === '' ? number : Number(number).toLocaleString(['ban', 'id']);
}

function bDetail(codigo) {
    $.getJSON('/aliment/detail/'+codigo, function (producto) { 
        var modal = '';
        modal += '<div class="cardD">';
        modal += '<ul>';
        modal += ' <li> Código:  <label >' + producto.cod_product+ '</label></li>';
        modal += ' <li> Nombre: <label>' + producto.name + '</label></li>';
        modal += ' <li> Precio:₡<label>' + formatNumber(producto.price) + '</label></li>';
        modal += ' <li> Tipo de animal: <label>' + producto.type_animal + '</label></li>';
        modal += ' <li> Tamaño: <label>' + producto.size + '</label></li>';
        modal += ' <li> Marca: <label>' + producto.brand + '</label></li>';
        modal += '<li>Descripción:  <label>' + producto.description + '</label></li>';
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
        title: '¿Está seguro de eliminar este producto?',
        text: "Esta acción es definitiva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí,Eliminar!',
        cancelButtonText: 'Cancelar!'

    }).then((result) => {
        if (result.isConfirmed) {

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/aliment/delete", true);
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

    xhttp.open("POST", "/aliment/search", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + text + "&filtro=" + filtar);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            productPG = [];
            productTD = [];
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
let productPG = [];
//Contenedor de filas.
let productTD = [];
// Registros por pagina.
let perPage = 5;

// Obtiene los empleados y los envia a convertir a HTML
const getProduct = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/aliment/listar`, true);
    xhr.send();

    content.innerHTML = '<td colspan="6" class="ta-center"  style="cursor: progress;">Cargando...</td>';


    xhr.addEventListener("loadend", (info) => {
        loadRows([...JSON.parse(info.target.response)]);
    });
}

// Carga las filas.
// Recibe un JSON del objeto a convertir en HTML.

let actualPage = 0;

const loadRows = (productArray) => {
    content.innerHTML = "";
    control = 0;

    if (productArray.length == 0) {
        content.innerHTML += '<td colspan="6" class="ta-center">No hay que mostrar.</td>'
    } else {

        // Recorro al reves para dejar primero los registros nuevos.
        for (let i = productArray.length - 1; i >= 0; i--) {
            productTD.push(appendClothes(productArray[i]));
            control++;

            // Si control llego al limite por pagina creamos una nueva
            if (control == perPage) {
                productPG.push(productTD);
                productTD = [];
                control = 0;
            }
        }

        // Si la pagina esta vacia no se pone
        if (productTD.length > 0) {
            productPG.push(productTD);
        }

        productTD = [];
        control = 0;

        changePage(actualPage);
    }
}

// Metodo que se coloca en el boton, recibe la pagina a la cual ir.
const changePage = (page) => {

    // Si se elimino el ultimo registro de una pagina no se podra  
    // acceder a esta entonces se reduce en 1 el numero de pagina.
    if (page >= productPG.length) {
        page--;
    }

    actualPage = page;

    // Limpia la tabla
    content.innerHTML = "";

    // Asigna el contenido de la pagina indicada
    for (let i = 0; i < productPG[page].length; i++) {
        content.innerHTML += productPG[page][i];
    }
    setButtons();
}

const setButtons = () => {
    // Obtenemos el contenedor de botones
    let buttons = document.getElementById('pagging');
    buttons.innerHTML = '';

    // Asignamos un boton para cada pagina de la matriz.
    for (let i = 0; i < productPG.length; i++) {
        buttons.innerHTML += `<a onclick="changePage(${i})" class="btn-send bDetail pagging 
        ${i == actualPage ? 'activeButton' : ''}">${i + 1}</a>`
    }
}

// Crea el HTML apartir del JSON.
const appendClothes = (p) => { //&#162
    let row = `
    <td>${p.name}</td>
    <td>${p.brand}</td>
    <td>${p.size}</td>
    <td>₡${formatNumber(p.price)}</td>
    <td>${p.type_animal}</td>  
    <td id="buttonsAcions">

    <button type="button" class="btn-detail bDetail" name="btn-detail" onclick="bDetail(${p.cod_product})">
    <i class="far fa-address-card fa-lg"></i></button>

        <a href="/aliment/getEdit?id=${p.cod_product}">
        <button type="button" class="bEdit btn-edit" name="btn-edit">
        <i class="far fa-edit fa-lg"></i></button></a>

        <a href="/imagesAliment/generate?id=${p.cod_product}">
        <button type="button" class="btn-ima" name="btn-edit">
        <i class="far fa-images fa-lg"></i></button></a>
                
    <button type="button" class="btn-delete bDelete" onclick="bDelete(${p.cod_product})">
    <i class="fas fa-trash-alt fa-lg"></i></button>
</td>`
    return row;
}

// Evento de cambio de cantidad de registros por pagina.
document.getElementById("peerPage").addEventListener("change", (e) => {
    perPage = e.target.value;
    productPG = [];
    productTD = [];
    getProduct();
})

function resetTable() {
    productPG = [];
    productTD = [];
    getProduct();
}