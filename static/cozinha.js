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
        const pedidoId = pedidoElement.dataset.id;
        console.log(`Pedido ${pedidoId} marcado como pago e removido.`)
        //Oh meu mano backend, atualiza o json ai porfavor

    });
}

//Recusar o pedido
function recusarPedido(pedidoElement) {
    pedidoElement.remove();
    const pedidoId = pedidoElement.dataset.id;
    console.log(`Pedido ${pedidoId} recusado e removido.`)

    //Oh meu mano backend, atualiza o json ai porfavor
}

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