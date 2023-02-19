const carrito = [];

const ordenarMenorMayor = () => {
    productos.sort((a,b)=> a.precio - b.precio);
    mostrarListaOrdenada();
}


const ordenarMayorMenor = () => {
    productos.sort((a,b)=> b.precio - a.precio);
    mostrarListaOrdenada();
}


const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
}


const comprarProductos = (listaDeProductos) => {
    let otroProducto;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
        productoNombre = prompt ('¿Que producto quiere comprar?'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuantos quiere comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en la lista.')
        }

        otroProducto = confirm('¿Desea agregar otro producto?');
    } while (otroProducto)

    confirmarCompra()

};


const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad;
    }
}


const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1);
            }
        }
    });

    confirmarCompra()
};


const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    });

    const confirmar = confirm('Checkout: '
            +'\n\n'+listaProductos.join('\n')
            +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar productos del carrito."'
    )

    if (confirmar) {
        finalizarCompra(listaProductos)
    } else {
        const productoAEliminar = prompt('¿Que producto desea eliminar?:')
        eliminarProductoCarrito(productoAEliminar)
    }
};


const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, elemento) => acc + elemento.cantidad, 0)
    const precioTotal = carrito.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0)
    alert('Detalle de su compra: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de la compra es: $'+precioTotal
        +'\n\nGracias por su confianza!'
    )
};


const comprar = () => {
    const productosBaratos = confirm("¿Quieres ver el producto mas barato primero?")
    if (productosBaratos){
        ordenarMenorMayor();
    }else{
        ordenarMayorMenor();
    }
}


comprar();
