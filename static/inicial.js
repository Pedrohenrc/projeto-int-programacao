document.getElementById('cliente').addEventListener('click', function(){
    const caminho = 'cliente'

    fetch('/redirecionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caminho: caminho }),
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = data.url
})
});

document.getElementById('cozinha').addEventListener('click', function(){
    const caminho = 'cozinha'

    fetch('/redirecionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caminho: caminho }),
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = data.url
})
})