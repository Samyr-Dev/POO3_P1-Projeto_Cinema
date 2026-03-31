window.onload = function() {
    // Busca as 3 fontes de dados independentes
    const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
    const salas = JSON.parse(localStorage.getItem('salas') || '[]');
    const sessoes = JSON.parse(localStorage.getItem('sessao') || '[]');
    
    const corpoTabela = document.getElementById('tabela-programacao');
    if (!corpoTabela) return;

    corpoTabela.innerHTML = "";

    // Percorremos todos os FILMES cadastrados
    filmes.forEach((filme, indexFilme) => {
        
        // Para cada filme, percorremos todas as SALAS
        salas.forEach((sala, indexSala) => {
            
            // Agora buscamos se existe uma SESSÃO que combine este Filme com esta Sala
            // Usamos .find() para achar a primeira que bata com os dois
            const sessaoInfo = sessoes.find(s => s.filme === filme.titulo && s.sala === sala.nome);

            const tr = document.createElement('tr');
            
            // Montamos a linha pegando o dado de cada origem
            tr.innerHTML = `
                <td>${filme.titulo}</td>
                <td>${sala.nome}</td>
                <td>${sessaoInfo ? sessaoInfo.horario : '<span class="text-muted">Sem horário</span>'}</td>
                <td>${sessaoInfo ? 'R$ ' + parseFloat(sessaoInfo.preco).toFixed(2) : '---'}</td>
                <td>
                    ${sessaoInfo ? 
                        `<button class="btn btn-success btn-sm" title="Clique para comprar o ingresso" onclick="comprar('${indexFilme}', '${indexSala}')">Comprar Ingresso</button>` : 
                        `<button class="btn btn-secondary btn-sm" title="Preço não informado" disabled>Indisponível</button>`
                    }
                </td>
            `;
            corpoTabela.appendChild(tr);
        });
    });
};

function comprar(idFilme, idSala) {
    // Lógica para enviar para a página de venda
    const filmes = JSON.parse(localStorage.getItem('filmes'));
    const salas = JSON.parse(localStorage.getItem('salas'));
    const sessoes = JSON.parse(localStorage.getItem('sessao'));

    const escolha = {
        filme: filmes[idFilme].titulo,
        sala: salas[idSala].nome,
        horario: sessoes[idSala].horario,
        preco: sessoes[idSala].preco
    };
    

    try {
            localStorage.setItem('venda_atual', JSON.stringify(escolha));

        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Erro ao salvar os dados: Espaço insuficiente no armazenamento local');
            } else {
                alert('Erro ao salvar os dados: ' + e.message);
            }
            return;
        }

    window.location.href = "venda-ingressos.html";
}