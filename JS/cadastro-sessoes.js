window.onload = function () {

    // Carrega os filmes e salas existentes para preencher os selects

    const filmesExistentes = JSON.parse(localStorage.getItem('filmes') || '[]');
    filmesExistentes.forEach(filmes => {
        const option = document.createElement('option');
        option.value = filmes.titulo; // Usamos o título do filme como valor
        option.textContent = filmes.titulo;
        document.getElementById('filmeSalvos').appendChild(option);
    });

    const salasExistentes = JSON.parse(localStorage.getItem('salas') || '[]');
    salasExistentes.forEach(salas => {
        const option = document.createElement('option');
        option.value = salas.nome; // Usamos o nome da sala como valor
        option.textContent = salas.nome;
        document.getElementById('sala').appendChild(option);
    });
 


    const formSessao = document.getElementById("form-sessao");
    // Em vez de salvar direto, esperamos o 'submit'
    formSessao.addEventListener('submit', function (event) {
        // Impede a página de recarregar antes de salvar
        event.preventDefault();

        const dadosParaSalvar = {
            filme: formSessao.filmeSalvos.value,
            sala: formSessao.sala.value,
            horario: formSessao.horario.value,
            preco: formSessao.preco.value,
            idioma: formSessao.idioma.value,
            tipo: formSessao.tipo.value
        }

        const sessoesExistentes = JSON.parse(localStorage.getItem('sessao') || '[]');
        sessoesExistentes.push(dadosParaSalvar);

        try {
            localStorage.setItem('sessao', JSON.stringify(sessoesExistentes));
            alert('Sessão salva com sucesso! Agora temos ' + sessoesExistentes.length + ' sessão(ões) cadastrada(s).');

            formSessao.reset();
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Erro ao salvar os dados: Espaço insuficiente no armazenamento local');
            } else {
                alert('Erro ao salvar os dados: ' + e.message);
            }
            return;
        }



    });


};