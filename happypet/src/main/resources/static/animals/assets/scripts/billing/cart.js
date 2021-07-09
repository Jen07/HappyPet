const removeFromCart = async (id) => {
    let table = document.getElementById("cart_table");
    table.innerHTML = await uploadTable(id);
    document.getElementById("cartNumber").textContent = document.getElementById("onCart").textContent;
}

const uploadTable = async (id) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", `/billing/removeFromCart?id=${id}`, true);
        xhr.send();

        xhr.addEventListener("loadend", (info) => {
            resolve(info.target.response);
        });
    });
};

const clearCart = async () => {
    const items = document.getElementById("onCart").textContent;
    if (items == 0) {
       alertEmpty()
    } else {
        let table = document.getElementById("cart_table");
        table.innerHTML = await uploadClear();
        document.getElementById("cartNumber").textContent = document.getElementById("onCart").textContent;
    }
};

const uploadClear = async () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", `/billing/clear_cart`, true);
        xhr.send();
        xhr.addEventListener("loadend", (info) => {
            resolve(info.target.response);
        });
    });
};

const buyout = async () => {
    const items = document.getElementById("onCart").textContent;
    if (items == 0) {
        alertEmpty()
    } else {
        // Primero solo guardar la factura.
        let id = await applyBuyout();

        // Montar el mail
        sendMail(id);

        // Limpiar carrito
        await clearCart();

        // Mostrar detalle
        window.location = `./bill_detail/${id}`;
    }
}

const alertEmpty = () => {
    Swal.fire(
        {
            title: `Su carrito esta vacío`,
            text: "Inténtelo nuevamente tras agregar algún producto.",
            icon: 'warning',
            confirmButtonColor: '#80BD5D',
            confirmButtonText: 'Confirmar!'
        }
    )
}

const applyBuyout = async () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", `/billing/buyout`, true);
        xhr.send();

        xhr.addEventListener("loadend", (info) => {
            resolve(info.target.response);
        });
    });
};

const sendMail = async (id) => {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open("POST", `/billing/send_mail`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; ');

        xhr.send(`id=${id}`);

        xhr.addEventListener("loadend", (info) => {
            resolve(info.target.response);
        });
    });
};