const table = document.getElementById("table_cont");

function onArchive(id) {
    const table = document.getElementById("table_cont");
    const user = document.querySelector("body").id;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/billing/archive_bill/${user}/${id}`, true);
    xhr.send();



    xhr.addEventListener("loadend", (info) => {
        table.innerHTML = info.target.response;
    });
}

function onUnArchive(user) {

    const table = document.getElementById("table_cont");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `/billing/unarchive_bills/${user}/`, true);
    xhr.send();

    xhr.addEventListener("loadend", (info) => {
        table.innerHTML = info.target.response;
    });
}
