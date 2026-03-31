/**
 * Função de Validação: Retorna true se tudo estiver correto, 
 * ou false se encontrar algum erro (parando a execução).
 */
function validaCampos() {
    const cpfValue = document.getElementById("CPF").value;
    const assentoValue = document.getElementById("assento").value;

    // 1. Validação do CPF (Exatamente 11 dígitos)
    if (cpfValue.length !== 11) {
        alert("O campo 'CPF' deve conter exatamente 11 dígitos (apenas números).");
        return false; 
    }

    // 2. Validação do Assento (Tamanho exato de 3 caracteres)
    if (assentoValue.length !== 3) {
        alert("O campo 'Assento' deve conter 3 caracteres (Ex: A01).");
        return false;
    }

    // 3. Validação do Formato do Assento (Letra Maiúscula + 2 Números)
    const regexAssento = /^[A-Z]{1}[0-9]{2}$/;
    if (!regexAssento.test(assentoValue)) {
        alert("Formato de Assento inválido! Use uma letra maiúscula seguida de dois números (Ex: B15).");
        return false;
    }

    return true; // Tudo ok!
}

window.onload = function () {
    // 1. Recupera a sessão selecionada na página anterior
    const vendaSessao = JSON.parse(localStorage.getItem('venda_atual') || 'null');
    const sessaoSelecionadaDiv = document.getElementById('sessao-selecionada');

    // Se não houver sessão selecionada, bloqueia a compra
    if (!vendaSessao || !vendaSessao.filme) {
        if (sessaoSelecionadaDiv) {
            sessaoSelecionadaDiv.innerHTML = `
                <div class="alert alert-warning">
                    <h3>Nenhuma sessão selecionada.</h3>
                    <p>Por favor, volte para a página de sessões e escolha um filme.</p>
                    <a href="sessoes.html" class="btn btn-primary">Voltar para Sessões</a>
                </div>
            `;
        }
        return; 
    }

    // 2. Exibe os detalhes da sessão que o usuário escolheu
    sessaoSelecionadaDiv.innerHTML = `
        <div class="card bg-dark text-white p-3 mb-4">
            <h3>Detalhes da Sessão</h3>
            <p><strong>Filme:</strong> ${vendaSessao.filme}</p>
            <p><strong>Sala:</strong> ${vendaSessao.sala}</p>
            <p><strong>Data/Hora:</strong> ${vendaSessao.horario}</p>
            <p><strong>Preço:</strong> R$ ${parseFloat(vendaSessao.preco).toFixed(2)}</p>
        </div>
    `;

    // 3. Lógica do Formulário de Compra
    const formIngresso = document.getElementById("form-ingresso");

    formIngresso.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        // --- PASSO 1: VALIDAR ---
        if (!validaCampos()) {
            return; // Se falhar na validação, o código PARA aqui e não salva nada.
        }

        // --- PASSO 2: PREPARAR OS DADOS ---
        const novoIngresso = {
            nomeCliente: formIngresso.nomeClient.value,
            CPF: formIngresso.CPF.value,
            assento: formIngresso.assento.value,
            // Vincula o ingresso à sessão escolhida
            filme: vendaSessao.filme,
            sala: vendaSessao.sala,
            horario: vendaSessao.horario,
            preco: vendaSessao.preco
        };

        // --- PASSO 3: SALVAR NO LOCALSTORAGE ---
        try {
            // Busca lista existente ou cria uma nova
            const ingressosExistentes = JSON.parse(localStorage.getItem('ingressos') || '[]');
            
            // Adiciona o novo ingresso à lista
            ingressosExistentes.push(novoIngresso);

            // Grava de volta no storage
            localStorage.setItem('ingressos', JSON.stringify(ingressosExistentes));

            alert('Ingresso comprado com sucesso!');
            formIngresso.reset(); // Limpa o formulário

        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Erro: Espaço insuficiente no navegador.');
            } else {
                alert('Erro ao salvar os dados: ' + e.message);
            }
        }
    });
};