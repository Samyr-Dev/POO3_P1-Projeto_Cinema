   function validaCampos() {



    //validação do CPF
    document.getElementById("CPF").length < 11 ? alert("O campo 'CPF' deve conter 11 dígitos") : true;
    document.getElementById("CPF").length > 11 ? alert("O campo 'CPF' deve conter 11 dígitos") : true;

    //Validação do assento
    document.getElementById("assento").length < 3 ? alert("O campo 'Assento' deve conter 3 dígitos") : true;
    document.getElementById("assento").length > 3 ? alert("O campo 'Assento' deve conter 3 dígitos") : true;

    if(!document.getElementById("assento").value.match(/^[A-Z]{1}[0-9]{2}$/)) {
        alert("O campo 'Assento' deve conter uma letra maiúscula seguida de dois números");
    }

    return false;

    
}

window.onload = function () {

    const vendaSessao = JSON.parse(localStorage.getItem('venda_atual') || '[]');
    const sessaoSelecionada = document.getElementById('sessao-selecionada');

    const div = document.createElement('div');

        if(!vendaSessao || !vendaSessao.filme) {
        div.innerHTML = `
            <h3>Nenhuma sessão selecionada. Por favor, volte para a página de sessões e escolha uma sessão para comprar o ingresso.</h3>
            <h4>Clique <a href="/html/sessoes.html">aqui</a> para voltar para a página de sessões.</h4>
        `;

        sessaoSelecionada.appendChild(div);

        return;
    }

    div.innerHTML = `
        <h3>Detalhes da Sessão</h3>
        <p><strong>Filme:</strong> ${vendaSessao.filme}</p>
        <p><strong>Sala:</strong> ${vendaSessao.sala}</p>
        <p><strong>Data:</strong> ${vendaSessao.horario}</p>
        <p><strong>Preço do ingresso:</strong> ${vendaSessao.preco}</p>
    `;

    sessaoSelecionada.appendChild(div);



    const formIngresso = document.getElementById("form-ingresso");
    // Em vez de salvar direto, esperamos o 'submit'
    formIngresso.addEventListener('submit', function (event) {
        // Impede a página de recarregar antes de salvar
        event.preventDefault();

        const dadosParaSalvar = {
            nomeClient: formIngresso.nomeClient.value,
            CPF: formIngresso.CPF.value,
            assento: formIngresso.assento.value
        }

        const ingressosExistentes = JSON.parse(localStorage.getItem('ingressos') || '[]');
        ingressosExistentes.push(dadosParaSalvar);


 

        try {

            if(!validaCampos()) {

            localStorage.setItem('ingressos', JSON.stringify(ingressosExistentes));
            alert('Ingresso comprado com sucesso!');

            formIngresso.reset();
                return;
            }
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