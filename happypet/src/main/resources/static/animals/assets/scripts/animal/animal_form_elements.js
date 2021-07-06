window.addEventListener("load", startup);

function startup() {
    getBreeds();
    getClients();
}

// Asigna un listener al combobox que solicitara al servidor un listado de razas.
function getBreeds() {
    const combo_specie = document.getElementById("combo_specie");

    combo_specie.addEventListener("change", (e) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", `/animal/getbreeds/?specie=${e.target.value}`, true);
        xhr.send();

        xhr.addEventListener("loadend", (info) => {
            setBreeds(info.target.response);
            validarSelect(document.getElementById('combo_breed'), 'breed', 'raza');
        });
    });
}

function setBreeds(result) {
    const combo = document.getElementById("combo_breed");
    combo.innerHTML = result;
}

function getClients() {
    combo = document.getElementById("combo_client");
    filter = document.getElementById("combo_filter");
    if (combo) {
        filter.addEventListener("keyup", (e) => {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", `/animal/filter_users/?filter=${filter.value}`, true);
            xhr.send();

            xhr.addEventListener("loadend", (info) => {
                setClients(info.target.response);
            });
        })
    }
}

function setClients(result) {
    combo = document.getElementById("combo_client");
    combo.innerHTML = result;
}