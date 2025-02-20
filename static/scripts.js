const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cartitems');
const cartTotal = document.getElementById('cart-total');
const cartCloseBtn = document.getElementById('fechar');
const finalizar = document.getElementById('finalizar');
const cartCounter = document.getElementById('cart-counter');

let cart = [];

//Função para mostrar os itens no carrinho
cartBtn.addEventListener('click', function() {
  cartModal.style.display = 'flex'
})

//Função para fechar o carrinho clicando fora
cartModal.addEventListener('click', function(event) {
  if (event.target === cartModal) {
    cartModal.style.display = 'none'
  }
})

//Função para fechar o carrinho clicando no botão
cartCloseBtn.addEventListener('click', function() {
  cartModal.style.display = 'none'
})

//Função para adicionar valores a items
menu.addEventListener('click', function(event) {
  let parentButton = event.target.closest('.btn');

  if(parentButton) {
    const name = parentButton.getAttribute('data-name');
    const price = parseFloat(parentButton.getAttribute('data-price'));
    const id = parentButton.getAttribute('data-id');

    addToCart(name, price);
  }

})

//Função para adicionar itens ao carrinho

function addToCart(name, price){

  const verification = cart.find(item => item.name === name); 
  
  if(verification){

    verification.qtd += 1;
  }else{

    cart.push({
      name,
      price,
      qtd: 1,
    })


  }

  updateCartModal();
  exibirMensagem();

}

//Função para mostrar os itens no carrinho
function updateCartModal(){
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add("itemincart");
    cartItemElement.innerHTML = `
      <div class="itin">
        <div>
          <strong>
            <p>${item.name}</p>
          </strong>
          <p>Quantidade: ${item.qtd}</p>
          <p>R$ ${item.price.toFixed(2)}</p>
        </div>


          <button class='remove' data-name='${item.name}''>
            Remover

          </button>
      </div>

    `


    total += item.price * item.qtd;

    cartItemsContainer.appendChild(cartItemElement);

  });

  cartTotal.innerHTML = `R$ ${total.toFixed(2)}`;

  cartCounter.innerHTML = cart.length;
}

//Função para remover itens do carrinho
cartItemsContainer.addEventListener('click', function(event){
  if(event.target.classList.contains('remove')){
    const name = event.target.getAttribute('data-name')

    removeItemCart(name)
  }
});

function removeItemCart(name){
  const index = cart.findIndex(item => item.name === name);

  if(index !== -1){
    const item = cart[index];

    if(item.qtd > 1){
      item.qtd -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

//Funcao para enviar o pedido para o apiflask
finalizar.addEventListener('click', function(){
  if(cart.length === 0) return;

  const mesa = document.getElementById('mesa').value;  

  const pedido = {
    mesa: mesa,
    Pedido: {
      pedido: cart.map(item => ({
        item: item.name,
        quantidade: item.qtd,
        preco: item.price
      })),
      precoo: parseFloat((cartTotal.textContent).replace('R$ ', ""))
    }
  };

  fetch('/enviar.pedidos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pedido)
  })
  .then(data => {
      console.log('Sucesso:', data);
      alert('Pedido enviado com sucesso!');
      cart = []; 
      updateCartModal(); 
  });
});

function exibirMensagem() {
  const mensagem = document.getElementById('mensagem')

  mensagem.classList.add('mostrar');

  setTimeout(() => {
    mensagem.classList.remove('mostrar')
  }, 1000)

}