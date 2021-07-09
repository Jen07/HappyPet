

function readFile(input) {
    let previewZone = document.getElementById('file-preview');

    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let filePreview = document.createElement('img');
            filePreview.id = 'file-preview';
            filePreview.src = e.target.result;
            previewZone.innerHTML = "";
            previewZone.appendChild(filePreview);
        }

        reader.readAsDataURL(input.files[0]);

    } else {
        previewZone.innerHTML = "";
    }
}

const setPreviewer = () => {


    let inputFile = document.getElementById("file");

    inputFile.addEventListener('change', function (event) {
        let uploadedFileName = event.target.files[0].name;

        if (uploadedFileName.endsWith("png") || uploadedFileName.endsWith("jpg") || uploadedFileName.endsWith("jpeg")) {
            readFile(event.srcElement);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Solo se permiten imágenes',
                timer: 2000
            });
            document.getElementById('file-preview').innerHTML = "";
            document.getElementById("file").value = "";
        }
    });

}

setPreviewer();


