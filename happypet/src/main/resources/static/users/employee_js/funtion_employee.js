function inicio() {
    getEmployee();
    document.getElementById("op2").style.background = '#BC4944';
    document.getElementById("op3").style.background = '#BC4944';
}

//Formato numerico
function formatNumber(number) {
    number = String(number).replace(/\D/g, "");
    return number === '' ? number : Number(number).toLocaleString(['ban', 'id']);
}


function bDetail2(id) {
    $.getJSON('/employee/detail2/' + id, function (employee) {
        var modal = '';
        modal += '<div class="cardD">';
        modal += '<ul>';
        if(employee.imagen!=null){
            modal += `<li><div class="card__image" style="max-width: 20%"> 
            <img src="/users/imageEmployee/${employee.imagen}"></img></div>
            </li>`;
        }else{
            modal += `<li><div class="card__image" style="max-width: 20%">
         <img src="/users/imageEmployee/default.jpg"></img></div></li>`;
        }
        modal += ' <li> Cédula: <label >' + employee.id + '</label></li>';
        modal += ' <li> Nombre: <label>' + employee.name + '</label></li>';
        modal += ' <li> Apellido: <label>' + employee.lastName + '</label></li>';
        modal += ' <li> Salario: ₡<label>' + formatNumber(employee.salary) + '</label></li>';
        modal += ' <li> Tipo: <label>' + employee.type + '</label></li>';
        modal += ' <li> Teléfono: <label>' + employee.phone + '</label></li>';
        modal += ' <li> Correo: <label>' + employee.mail + '</label></li>';
        modal += '<li> Dirreción:  <label>' + employee.address + '</label></li>';
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


function bEdit(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getEdit", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);
}

/*Elimina al empleado pero antes muestra mensaje de verificación 
y actualiza solo la tabla sin recargar la paguina */
function bDelete(id) {

    Swal.fire({
        title: '¿Estas seguro de eliminar al Empleado ?',
        text: "Esta acción es definitiva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#80BD5D',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí,Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/employee/delete", true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.send("id=" + id);
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

    xhttp.open("POST", "/employee/search", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + text + "&filtro=" + filtar);

    console.log(text);
    console.log(filtar);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            employeePG = [];
            employeeTD = [];
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
let employeePG = [];
//Contenedor de filas.
let employeeTD = [];
// Registros por pagina.
let perPage = 5;

// Obtiene los empleados y los envia a convertir a HTML
const getEmployee = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/employee/listar`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        loadRows([...JSON.parse(info.target.response)]);
    });
}

// Carga las filas.
// Recibe un JSON del objeto a convertir en HTML.
let actualPage = 0;

const loadRows = (employeeArray) => {
    content.innerHTML = "";
    control = 0;

    if (employeeArray.length == 0) {
        content.innerHTML += '<td colspan="5" class="ta-center">No hay que mostrar.</td>'
    } else {

        // Recorro al reves para dejar primero los registros nuevos.
        for (let i = employeeArray.length - 1; i >= 0; i--) {
            employeeTD.push(appendEmployee(employeeArray[i]));
            control++;

            // Si control llego al limite por pagina creamos una nueva
            if (control == perPage) {
                employeePG.push(employeeTD);
                employeeTD = [];
                control = 0;
            }
        }

        // Si la pagina esta vacia no se pone
        if (employeeTD.length > 0) {
            employeePG.push(employeeTD);
        }

        employeeTD = [];
        control = 0;

        changePage(actualPage);
    }
}

// Metodo que se coloca en el boton, recibe la pagina a la cual ir.
const changePage = (page) => {

    // Si se elimino el ultimo registro de una pagina no se podra  
    // acceder a esta entonces se reduce en 1 el numero de pagina.
    if (page >= employeePG.length) {
        page--;
    }

    actualPage = page;

    // Limpia la tabla
    content.innerHTML = "";

    // Asigna el contenido de la pagina indicada



    for (let i = 0; i < employeePG[page].length; i++) {
        content.innerHTML += employeePG[page][i];
    }
    setButtons();
}

const setButtons = () => {
    // Obtenemos el contenedor de botones
    let buttons = document.getElementById('pagging');
    buttons.innerHTML = '';

    // Asignamos un boton para cada pagina de la matriz.
    for (let i = 0; i < employeePG.length; i++) {
        buttons.innerHTML += `<a onclick="changePage(${i})" class="btn-send bDetail pagging ${i == actualPage ? 'activeButton' : ''}
        ">${i + 1}</a>`
    }
}

// Crea el HTML apartir del JSON.
const appendEmployee = (e) => {
    let row = `
    <td>${e.id}</td>
    <td>${e.name}</td>
    <td>${e.lastName}</td>
    <td>${e.type}</td>  
    <td id="buttonsAcions">

    <button type="button" class="btn-detail bDetail" name="btn-detail" 
    onclick="bDetail2(${e.id})"><i class="far fa-address-card fa-lg"></i></button>

        <a href="/employee/getEdit?id=${e.id}">
        <button type="button" class="bEdit btn-edit" name="btn-edit">
        <i class="far fa-edit fa-lg"></i></button></a>
                
    <button type="button" class="btn-delete bDelete" onclick="bDelete(${e.id})">
    <i class="fas fa-trash-alt fa-lg"></i></button>
    </td>`
    return row;
}

// Evento de cambio de cantidad de registros por pagina.
document.getElementById("peerPage").addEventListener("change", (e) => {
    perPage = e.target.value;
    employeePG = [];
    employeeTD = [];
    getEmployee();
})

function resetTable() {
    employeePG = [];
    employeeTD = [];
    getEmployee();
}


