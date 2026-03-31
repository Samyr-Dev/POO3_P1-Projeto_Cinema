window.onload = function () {



    const formFilme = document.getElementById("form-filme");
    // Em vez de salvar direto, esperamos o 'submit'
    formFilme.addEventListener('submit', function (event) {
        // Impede a página de recarregar antes de salvar
        event.preventDefault();

        const dadosParaSalvar = {
            titulo: formFilme.titulo.value,
            genero: formFilme.genero.value,
            descricao: formFilme.descricao.value,
            classificacao: formFilme.classificacao.value,
            duracao: formFilme.duracao.value,
            date: formFilme.date.value
        }

        const filmesExistentes = JSON.parse(localStorage.getItem('filmes') || '[]');
        filmesExistentes.push(dadosParaSalvar);

        try {
            localStorage.setItem('filmes', JSON.stringify(filmesExistentes));
            alert('Filme salvo com sucesso! Agora temos ' + filmesExistentes.length + ' filme(s) cadastrado(s).');

            formFilme.reset();
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