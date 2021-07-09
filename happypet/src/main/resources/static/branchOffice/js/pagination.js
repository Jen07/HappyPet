/*---------------------------------------------------------------------------------------------------------- */

/*
    Trae todos los animales del servidor
*/

// Contenido de la tabla
const content = document.getElementById("contenido");
// Contenedor de paginas.
let sucursalPG = [];
//Contenedor de filas.
let sucursalTD = [];
// Registros por pagina.
let perPage = 10;



// Obtiene los animales y los envia a convertir a HTML
const getSucursales= () => $.getJSON('/sucursales/listSucursal', function(json) {
    loadRows(json);
});

// Carga las filas.
// Recibe un JSON del objeto a convertir en HTML.

let actualPage = 0;

const loadRows = (sucursalArray) => {
    content.innerHTML = "";
    control = 0;

    if (sucursalArray.length == 0) {
        content.innerHTML += '<td colspan="5" class="ta-center">No hay que mostrar.</td>'
    } else {

        // Recorro al reves para dejar primero los registros nuevos.
        for (let i = sucursalArray.length - 1; i >= 0; i--) {
            sucursalTD.push(appendSucursal(sucursalArray[i]));
            control++;

            // Si control llego al limite por pagina creamos una nueva
            if (control == perPage) {
                sucursalPG.push(sucursalTD);
                sucursalTD = [];
                control = 0;
            }
        }

        // Si la pagina esta vacia no se pone
        if (sucursalTD.length > 0) {
            sucursalPG.push(sucursalTD);
        }

        sucursalTD = [];
        control = 0;

        changePage(actualPage);
    }
}

// Metodo que se coloca en el boton, recibe la pagina a la cual ir.
const changePage = (page) => {

    // Si se elimino el ultimo registro de una pagina no se podra  
    // acceder a esta entonces se reduce en 1 el numero de pagina.
    if (page >= sucursalPG.length) {
        page--;
    }

    actualPage = page;

    // Limpia la tabla
    content.innerHTML = "";

    // Asigna el contenido de la pagina indicada



    for (let i = 0; i < sucursalPG[page].length; i++) {
        content.innerHTML += sucursalPG[page][i];
    }
    setButtons();
}

const setButtons = () => {
    // Obtenemos el contenedor de botones
    let buttons = document.getElementById('pagging');
    buttons.innerHTML = '';

    // Asignamos un boton para cada pagina de la matriz.
    for (let i = 0; i < sucursalPG.length; i++) {
        buttons.innerHTML += `<a onclick="changePage(${i})" class="pagging btn-send ${i == actualPage ? 'activeButton' : ''} ">${i + 1}</a>`
    }
}

// Crea el HTML apartir del JSON.
const appendSucursal = (json) => {
    
    var tr = '';
    tr += '<tr>';
			tr += '<td>' + json.cedulaJuridica + '</td>';
			tr += '<td>' + json.provincia + '</td>';
			tr += '<td>' + json.ciudad + '</td>';
			tr += '<td> <button class="btn-sucursal btns-send  far fa-address-card fa-1x"> </button> <button class="btn-sucursal btns-delete fas fa-trash-alt fa-1x"></button> <button class="btn-sucursal btns-edit far fa-edit fa-1x"></i></button> </td>';
			tr += '</tr>';

    return tr;
}

// Evento de cambio de cantidad de registros por pagina.
document.getElementById("peerPage").addEventListener("change", (e) => {
    perPage = e.target.value;
    sucursalPG = [];
    sucursalTD = [];
    getSucursales();
})

function resetTable() {
    sucursalPG = [];
    sucursalTD = [];

    getSucursales();
}


getSucursales();