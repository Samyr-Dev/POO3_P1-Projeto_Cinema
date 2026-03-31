window.onload = function () {

    const formSala = document.getElementById("form-sala");
    // Em vez de salvar direto, esperamos o 'submit'
    formSala.addEventListener('submit', function (event) {
        // Impede a página de recarregar antes de salvar
        event.preventDefault();

        const dadosParaSalvar = {
            nome: formSala.nome.value,
            capacidade: formSala.capacidade.value,
            tipo: formSala.tipo.value
        }

        const salasExistentes = JSON.parse(localStorage.getItem('salas') || '[]');
        salasExistentes.push(dadosParaSalvar);

        try {
            localStorage.setItem('salas', JSON.stringify(salasExistentes));
            alert('Sala salva com sucesso! Agora temos ' + salasExistentes.length + ' sala(s) cadastrada(s).');

            formSala.reset();
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