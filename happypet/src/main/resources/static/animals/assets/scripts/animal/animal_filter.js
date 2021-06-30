
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
		prepareDatatable();
	});

}