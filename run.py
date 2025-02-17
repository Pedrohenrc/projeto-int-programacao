from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

def carregar_dados(caminho):
    if os.path.exists(caminho):
        with open(caminho, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

def salvar_dados(caminho, dados):
    with open(caminho, "w", encoding="utf-8") as file:
        json.dump(dados, file, indent=4)

@app.route('/')
def index():
    cardapio = carregar_dados('data/cardapio.json')
    return render_template("user.html", cardapio=cardapio)

@app.route('/enviar.pedidos', methods = ['POST'])
#get = receber arquivos, ver
#post = editar, nao necessita ver
def enviar_pedido():
    peticao = request.json
    mesa = peticao.get('mesa') #pedido enviado do usuario
    pedidado = peticao.get('pedido')

    novo_pedido = {
        "mesa": mesa,
        "pedido": pedidado
    }

    pedidos = carregar_dados('data/pedidos.json') #abriu
    pedidos.append(novo_pedido) #adicionou
    salvar_dados('data/pedidos.json', pedidos) #fechou
    return jsonify({"status": "Pedido enviado com sucesso!"})

@app.route('/cozinha')
def cozinha():
    pedidos = carregar_dados('data/pedidos.json')
    return render_template('cozinha.html', pedidos = pedidos)

@app.route('/atualizar_pedido/<int:pedido_id>', methods=["POST"])
def enviarpedido (id_pedido):
    pedidos = carregar_dados('data/pedidos.json')
    acao = request.json.get('acao')

    if acao == 'confirmar':
        pedidos[id_pedido]['status'] = 'confirmado'
    elif acao == 'recusado':
        pedidos[id_pedido]['status'] = 'recusado'

    salvar_dados('data/pedidos.json', pedidos)
    return jsonify ({'Status: resposta recebida com sucesso!'})

if __name__ == "__main__":
    app.run(debug=True)
    