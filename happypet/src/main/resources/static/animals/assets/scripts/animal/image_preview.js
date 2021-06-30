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

const setPreviewer = () =>{
    let fileUpload = document.getElementById('file');
    fileUpload.onchange = function (e) {
        readFile(e.srcElement);
    }
}
