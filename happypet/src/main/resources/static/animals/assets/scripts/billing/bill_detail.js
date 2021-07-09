let sended = 0;
const confirmSend = (id) => {

    if (sended === 0) {
        sended++;
        sendMail(id);

    } else {
        Swal.fire(
            {
                title: `Ya enviaste esta factura`,
                text: "Quieres enviarla nuevamente?",
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#80BD5D',
                cancelButtonColor: '#D8524E',
                confirmButtonText: 'Si, reenviar!'
            }
        ).then((result) => {

            if (result.isConfirmed) {
                sendMail(id);
            }
        })
    }
};

function sendMail(id) {
    document.getElementById("sendMail").disabled = true;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `/billing/send_mail`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; ');

    xhr.send(`id=${id}`);

    xhr.addEventListener("loadend", (info) => {
        Swal.fire(
            {
                title: `Enviada exitosamente`,
                text: "Recibirás la factura en los proximos minutos.",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#80BD5D',
                confirmButtonText: 'Confirmar!'
            }
        )
    });
};

/*
if (document.referrer.endsWith('/billing/cart')) {
    sended++
    Swal.fire({
        title: `Atencion`,
        text: 'La factura ha sido enviada y llegará a su correo en unos momentos.',
        showConfirmButton: false,
        timer: 3000
    })
}

*/