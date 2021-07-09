const table = document.getElementById("table_cont");

function onArchive(id) {
    const table = document.getElementById("table_cont");
    const user = document.querySelector("body").id;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/billing/archive_bill/${user}/${id}`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        setTimeout(() => {
            resetTable();
        }, 1000)
    });
}

function onUnArchive(user) {

    const table = document.getElementById("table_cont");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/billing/unarchive_bills/${user}/`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        resetTable();
    });
}

















function resetTable() {
    billsPG = [];
    billsTD = [];

    getBills();
}

/*---------------------------------------------------------------------------------------------------------- */

/*
    Trae todos los animales del servidor
*/

// Contenido de la tabla
const content = document.getElementById("contenido");
// Contenedor de paginas.
let billsPG = [];
//Contenedor de filas.
let billsTD = [];
// Registros por pagina.
let perPage = 5;

// Obtiene los animales y los envia a convertir a HTML
const getBills = () => {
    const id = document.querySelector("body").id;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/billing/my_bills_J/${id}`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        loadRows([...JSON.parse(info.target.response)]);
    });

    setTotalArchieved();
}

// Carga las filas.
// Recibe un JSON del objeto a convertir en HTML.

let actualPage = 0;

const loadRows = (billsArray) => {
    content.innerHTML = "";
    control = 0;

    if (billsArray.length == 0) {
        content.innerHTML += '<td colspan="4" class="ta-center">No hay que mostrar.</td>'
    } else {

        // Recorro al reves para dejar primero los registros nuevos.
        for (let i = billsArray.length - 1; i >= 0; i--) {
            billsTD.push(appendBill(billsArray[i]));
            control++;

            // Si control llego al limite por pagina creamos una nueva
            if (control == perPage) {
                billsPG.push(billsTD);
                billsTD = [];
                control = 0;
            }
        }

        // Si la pagina esta vacia no se pone
        if (billsTD.length > 0) {
            billsPG.push(billsTD);
        }

        billsTD = [];
        control = 0;

        changePage(actualPage);
    }
}

const setTotalArchieved = () => {
    const id = document.querySelector("body").id;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/billing/getUnarchievedTotal/${id}/`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        document.getElementById("totalArchieved").innerHTML = info.target.response;
    });


}

// Metodo que se coloca en el boton, recibe la pagina a la cual ir.
const changePage = (page) => {

    // Si se elimino el ultimo registro de una pagina no se podra  
    // acceder a esta entonces se reduce en 1 el numero de pagina.
    if (page >= billsPG.length) {
        page--;
    }

    actualPage = page;

    // Limpia la tabla
    content.innerHTML = "";

    // Asigna el contenido de la pagina indicada



    for (let i = 0; i < billsPG[page].length; i++) {
        content.innerHTML += billsPG[page][i];
    }
    setButtons();
}

const setButtons = () => {

    // Obtenemos el contenedor de botones
    let buttons = document.getElementById('pagging');
    buttons.innerHTML = '';

    // Asignamos un boton para cada pagina de la matriz.
    for (let i = 0; i < billsPG.length; i++) {
        buttons.innerHTML += `<a onclick="changePage(${i})" class="btn-send bDetail pagging ${i == actualPage ? 'activeButton' : ''}" style="cursor: pointer;">${i + 1}</a>`
    }
}

// Crea el HTML apartir del JSON.
const appendBill = (bill) => {
    let row = ` 
            <td> <span >${bill.id}</span></td>
            <td> <span >${bill.receivedAt}</span></td>
            <td> <span >${bill.total}</span></td>

            <td id="buttonsAcions">
                <div class="row justify-center">

                <a class=" btn-edit bEdit" href="/billing/bill_detail/${bill.id}">
                    <i class="far fa-address-card"></i></a>

                    <a class=" btn-delete bDelete" onclick="onArchive(${bill.id})"><i
                        class="fas fa-archive"></i></a>
                </div>
            </td>
                `
    return row;
}

// Evento de cambio de cantidad de registros por pagina.
document.getElementById("peerPage").addEventListener("change", (e) => {
    perPage = e.target.value;
    billsPG = [];
    billsTD = [];
    getBills();
})

getBills();


const filterBills = () => {

    const d = document.getElementById('search__input').value.split('-');

    if (d.length == 3) {
        date = (`${d[2]}/${d[1]}/${d[0]}`);

        const id = document.querySelector("body").id;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `/billing/getFilteredDate/${id}/?date=${date}`, true);
        xhr.send();

        xhr.addEventListener("loadend", (info) => {
            billsPG = [];
            billsTD = [];
            loadRows([...JSON.parse(info.target.response)]);
        });

        setTotalArchieved();


    } else {
        Swal.fire(
            {
                title: `Atención!`,
                text: "Ingrese una fecha primero.",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500
            }
        )
    }

}