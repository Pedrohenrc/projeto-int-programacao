// Aqui você pode adicionar seu código JavaScript

// Exemplo de função para carregar o cardápio
async function carregarCardapio() {
    try {
      const response = await fetch('/api/cardapio');
      const data = await response.json();
      // Aqui você pode manipular os dados do cardápio
    } catch (error) {
      console.error('Erro ao carregar o cardápio:', error);
    }
  }
  
  // Exemplo de função para enviar pedido
  async function enviarPedido(pedido) {
    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido)
      });
      const data = await response.json();
      // Aqui você pode manipular a resposta do pedido
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  }