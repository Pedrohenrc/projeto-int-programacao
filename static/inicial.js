document.getElementById('cliente').addEventListener('click', function(){
    const caminho = 'cliente'

    fetch('/redirecionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cliente: caminho }),
    })
    .then(() => {
        console.log('Resposta enviada')
})
})
document.getElementById('chefe').addEventListener('click', function(){
    const caminho = 'chefe'

    fetch('/redirecionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cliente: caminho }),
    })
    .then(() => {
        console.log('Resposta enviada')
})
})