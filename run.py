from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import os

app = Flask(__name__)

def carregar_dados(caminho):
    if os.path.exists(caminho):
        with open(caminho, "r", encoding='utf-8') as file:
            return json.load(file)
    return []

def salvar_dados(caminho, dados):
    with open(caminho, "w", encoding='utf-8') as file:
        json.dump(dados, file, indent=4)
        
@app.route('/')
def index():
    return render_template("paginainicial.html")

@app.route('/redirecionar', methods = ['POST'])
def redirecionar():
    caminho = request.json.get('caminho')

    if caminho == 'cliente':
        redirect(url_for('/cardapio'))
    elif caminho == 'chefe':
        redirect(url_for('/cozinha'))

@app.route('/cardapio')
def cardapio():
    cardapio = carregar_dados('data/cardapio.json')
    return render_template("user.html", cardapio=cardapio)

# Rota para enviar pedidos
@app.route('/enviar.pedidos', methods = ['POST'])
#get = receber arquivos, ver
#post = editar, nao necessita ver
def enviar_pedido():

    pedidos = carregar_dados('data/pedidos.json')
    peticao = request.json

    mesa = peticao.get('mesa') #pedido enviado do usuario
    pedidado = peticao.get('Pedido').get('pedido')
    preço = peticao.get('Pedido').get('precoo')

    if pedidos:
        maior = pedidos[0]['id']
        for pedido in pedidos:
            if pedido['id'] > maior:
                maior = pedido['id']
    else: maior = 0

    novo_pedido = {
        "id": maior + 1,
        "mesa": mesa,
        "pedido": pedidado,
        "preco": preço,
    }

    pedidos.append(novo_pedido) #adicionou
    salvar_dados('data/pedidos.json', pedidos) #fechou
    return jsonify({"status": "Pedido enviado com sucesso!"})


@app.route('/cozinha')
def cozinha():
    pedidos = carregar_dados('data/pedidos.json')
    return render_template("cozinha.html", pedidos = pedidos)

@app.route('/remover_pedido/<int:pedido_id>', methods=["DELETE"])
def removerpedido (pedido_id): 
    pedidos = carregar_dados('data/pedidos.json')

    for pedido in pedidos:
        if pedido["id"] == pedido_id:
            pedidos.remove(pedido)
            break
    
    salvar_dados('data/pedidos.json', pedidos)

    return jsonify({"mensagem": "Pedido enviado com sucesso"})


if __name__ == "__main__":
    app.run(debug=True)
    