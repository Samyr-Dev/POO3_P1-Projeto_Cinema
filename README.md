# Sistema Web de Controle de Cinema

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Samyr-Dev/POO3_P1-Projeto_Cinema/blob/main/LICENSE)

Este projeto consiste em um sistema web para gerenciamento de um cinema, desenvolvido com foco no estudo de JavaScript, Bootstrap e persistência de dados em memória cache através do Local Storage.

## Objetivo
Desenvolver um sistema web de controle de cinema utilizando HTML, Bootstrap e JavaScript, implementando funcionalidades como cadastro de filmes, sessões, salas e venda de ingressos. Os dados são armazenados localmente via localStorage, e a navegação é realizada através de páginas HTML interligadas.

## Conceitos Trabalhados
*   Manipulação do DOM com JavaScript.
*   Uso de localStorage para armazenamento de dados.
*   Estruturação de formulários HTML.
*   Criação dinâmica de elementos (ex: options em elementos select).
*   Armazenamento e leitura de arrays de objetos em formato JSON.
*   Encadeamento de dados entre diferentes entidades.

## Estrutura do Sistema

### 1. Página Inicial (`index.html`)
Menu de navegação com acesso para todas as funcionalidades do sistema:
*   Cadastro de Filmes
*   Cadastro de Salas
*   Cadastro de Sessões
*   Venda de Ingressos
*   Listagem de Sessões Disponíveis

### 2. Cadastro de Filmes (`cadastro-filmes.html`)
Formulário para registro de filmes com os campos:
*   Título, Gênero, Descrição, Classificação Indicativa, Duração (minutos) e Data de Estreia.
*   **Armazenamento:** Chave `filmes` no localStorage.

### 3. Cadastro de Salas (`cadastro-salas.html`)
Formulário para registro de salas:
*   Nome da Sala, Capacidade e Tipo (2D, 3D, IMAX).
*   **Armazenamento:** Chave `salas` no localStorage.

### 4. Cadastro de Sessões (`cadastro-sessoes.html`)
Formulário para vincular filmes e salas:
*   Seleção de Filme e Sala (carregados dinamicamente).
*   Data e Hora, Preço, Idioma (Dublado/Legendado) e Formato (2D/3D).
*   **Armazenamento:** Chave `sessoes` no localStorage.

### 5. Venda de Ingressos (`venda-ingressos.html`)
Formulário para processar vendas:
*   Seleção de Sessão, Nome do Cliente, CPF, Assento e Tipo de Pagamento.
*   **Armazenamento:** Chave `ingressos` no localStorage.

### 6. Listagem de Sessões Disponíveis (`sessoes.html`)
Exibição dos dados combinados:
*   Título do Filme, Nome da Sala, Data/Hora e Preço.
*   Botão "Comprar Ingresso" que redireciona para a página de venda com a sessão pré-selecionada.

---

## Tutorial: Armazenamento no Browser (LocalStorage)

O localStorage funciona como um objeto de chave e valor que armazena apenas strings.

### Métodos Principais

| Método | Descrição | Exemplo |
| :--- | :--- | :--- |
| `setItem()` | Adiciona uma chave e um valor | `localStorage.setItem('tema', 'escuro');` |
| `getItem()` | Recupera o valor de uma chave | `localStorage.getItem('tema');` |

### Manipulação de Objetos e Arrays
Para salvar objetos, utiliza-se `JSON.stringify()` para converter o objeto em string. Para ler os dados, utiliza-se `JSON.parse()` para transformar a string de volta em um objeto manipulável.

### Boas Práticas
*   **Segurança:** Não salvar dados sensíveis como senhas ou dados de cartão de crédito.
*   **Sincronismo:** O localStorage é síncrono; volumes gigantescos de dados podem impactar a interface.
*   **Limite:** Recomenda-se o uso de blocos `try...catch` ao utilizar `setItem` para evitar erros caso o armazenamento esteja cheio.

---

## Como Executar

1. Clone o repositório:
   bash
   git clone https://github.com/Samyr-Dev/POO3_P1-Projeto_Cinema
   
2. Navegue até a pasta do projeto.
3. Execute o arquivo `index.html` utilizando a extensão **Open Live Server** no seu editor de código.
4. Utilize o menu de navegação para cadastrar filmes, salas, sessões e realizar vendas.

---

## Licença
Este projeto está sob a licença MIT. Para mais detalhes, acesse o arquivo [LICENSE](https://github.com/Samyr-Dev/POO3_P1-Projeto_Cinema/blob/main/LICENSE).

## Desenvolvedor
**Samyr Tertuliano**
*   [LinkedIn](https://www.linkedin.com/in/samyrtertuliano)
