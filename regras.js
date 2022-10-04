const API_URL = 'http://localhost:8000'

function marcarTodos() {
    let todos = document.querySelectorAll('[data-check="acao"]');

    todos.forEach((cadaCheck) => {
        cadaCheck.checked = checked_all.checked;
    });

    acionarBotaoExcluir();
}

function buscarParaEditar(id) {
    fetch(API_URL+'/compras/'+id)
        .then(resposta => resposta.json())
        .then(dados => {
            inputEditarId.value = id;
            inputEditarItem.value = dados.item;
            inputEditarQuantidade.value = dados.quantidade;
        });
}

function editar() {
    event.preventDefault();
    
    let dados = {
        item: inputEditarItem.value,
        quantidade: inputEditarQuantidade.value,
    };

    fetch(API_URL+'/compras/'+inputEditarId.value, {
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resposta => resposta.json())
        .then(() => atualizarLista());
    
    let x = document.querySelector('[data-bs-dismiss="offcanvas"]');

    x.dispatchEvent(new Event('click'));
}

function inserir () {
    event.preventDefault();

    let dados = {
        item: input_item.value,
        quantidade: parseInt(input_quantidade.value),
    };

    fetch(API_URL+'/compras/', {
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
    let resposta = confirm('Você tem certeza?');

    if (resposta !== true) {
        return;
    }

    await fetch(API_URL+'/compras/'+id, {
        method: 'DELETE'
    });

    atualizarLista();
}

function atualizarLista() {
    tabela_compras.innerHTML = '';

    fetch(API_URL+'/compras/')
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function (lista) {
        lista.forEach(function (cadaItem) {
            tabela_compras.innerHTML += `
                <tr>
                    <td><input onclick="acionarBotaoExcluir()" value="${cadaItem.id}" data-check="acao" type="checkbox"> </td>
                    <td>${cadaItem.id}</td>
                    <td>${cadaItem.item}</td>
                    <td>${cadaItem.quantidade}</td>
                    <td>
                        <button onclick="buscarParaEditar(${cadaItem.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-warning btn-sm">
                            Editar
                        </button>
                        <button class="btn btn-danger" onclick="excluir(${cadaItem.id})">
                            Excluir
                        </button>
                </tr>

                `
        })
    })
}

atualizarLista();
