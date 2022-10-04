function acionarBotaoExcluir() {
    
    let todosChecks = document.querySelectorAll('[data-check="acao"]');

    let quantidade = 0;

    todosChecks.forEach((cadaCheck) => {
        cadaCheck.checked === true && quantidade++;
    })

    if (quantidade > 0) {
        btn_remove_all.classList.remove('d-none');
    } else {
        btn_remove_all.classList.add('d-none');
    }
}

function excluirSelecionados() {
    if (false === confirm('Tem certeza?')) {
        return;
    }

    let todosChecks = document.querySelectorAll('[data-check="acao"]');

    todosChecks.forEach(async (cadaCheck) => {
        if (cadaCheck.checked === true) {
            await fetch(API_URL+'/compras/'+cadaCheck.value, {
                method: 'DELETE'
            })
        }
    });

    atualizarLista();
}
