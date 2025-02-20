
//Recusar o pedido
function recusarPedido(pedidoElement) {
    const pedido_id = pedidoElement.dataset.id;

    fetch(`/remover_pedido/${pedido_id}`, {
        method: 'DELETE',
    })

    .then(() => {
        pedidoElement.remove(); 
    })
}

document.querySelectorAll('.recusar').forEach(button => {
    button.addEventListener('click', function() {
        const pedidoElement = this.closest('.pedido');
        recusarPedido(pedidoElement);
    });
});

//Função para mover os pedidos para a seção de pedidos aceitos
function aceitarPedido(pedidoElement) {
    const pedidosAceitos = document.querySelector('.pedidos-aceitos')
    pedidosAceitos.appendChild(pedidoElement);

    pedidoElement.querySelector('.aceitar').remove();
    pedidoElement.querySelector('.recusar').remove();

    const botaoPago = document.createElement('button');
    botaoPago.className = 'btn-pago';
    botaoPago.textContent = 'Pago';
    pedidoElement.appendChild(botaoPago);

    botaoPago.addEventListener('click', () => {
        pedidoElement.remove();
        const pedido_id = pedidoElement.dataset.id;
        console.log(`Pedido ${pedido_id} marcado como pago e removido.`)
        fetch(`/remover_pedido/${pedido_id}`, {
            method: 'DELETE',
    })
    
    .then(() => {
        pedidoElement.remove();
    })
})}
document.querySelectorAll('.Pago').forEach(button => {
    button.addEventListener('click', function() {
        const pedidoElement = this.closest('.pedido');
        recusarPedido(pedidoElement);
    });
});



//Adiciona os eventos de aceitar e recusar pedido
document.querySelector('.pedidos-pendentes').addEventListener('click', (event) => {
    if (event.target.classList.contains('aceitar')) {
        const pedidoElement = event.target.closest('.pedido');
        aceitarPedido(pedidoElement);

    } else if (event.target.classList.contains('recusar')) {
        const pedidoElement = event.target.closest('.pedido');
        recusarPedido(pedidoElement);
    }
});