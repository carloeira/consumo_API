function inserir () {
    event.preventDefault();

    let dados = {
        item: input_item.value,
        quantidade: parseInt(input_quantidade.value),
    };

    fetch('http://localhost:8000/compras', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then( (resposta) => resposta.json()) 
        .then( (resposta) => atualizarLista());
    
    form_add.reset();
}

async function excluir (id) {
    await fetch('http://localhost:8000/compras/'+id, {
        method: 'DELETE'
    });

    atualizarLista();
}

function atualizarLista() {
    tabela_compras.innerHTML = '';

    fetch("http://localhost:8000/compras")
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function (lista) {
        lista.forEach(function (cadaItem) {
            tabela_compras.innerHTML += `
                <tr>
                    <td>${cadaItem.id}</td>
                    <td>${cadaItem.item}</td>
                    <td>${cadaItem.quantidade}</td>
                    <td>
                        <button class="btn btn-danger" onclick="excluir(${cadaItem.id})">
                            Excluir
                        </button>
                </tr>
                
                `
        })
    })
}

atualizarLista();