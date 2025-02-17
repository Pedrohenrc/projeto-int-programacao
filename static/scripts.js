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
    
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  }

  let carrinho = [];

  // Função para adicionar item ao carrinho
  function adicionarAoCarrinho(nome, preco, id) {
      const quantidade = document.getElementById(`qtd-${id}`).value;
  
      const item = {
          nome: nome,
          preco: preco,
          quantidade: parseInt(quantidade)
      };
  
      carrinho.push(item);
      console.log("Carrinho atualizado:", carrinho);
      alert(`${quantidade}x ${nome} adicionado ao carrinho!`);
  }
  
  // Função para enviar o pedido para o backend
  async function enviarPedido() {
      const mesa = prompt("Número da mesa:");
  
      const pedido = {
          mesa: mesa,
          pedido: carrinho
      };
  
      try {
          const response = await fetch('/enviar.pedidos', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(pedido)
          });
  
          const data = await response.json();
          alert(data.status);
          carrinho = []; // Limpa o carrinho após o envio
      } catch (error) {
          console.error('Erro ao enviar o pedido:', error);
      }
  }