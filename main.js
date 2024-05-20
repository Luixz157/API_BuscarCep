//Fazer ligação com uma API -> fetch = ajuda a fazer a comunicação
//Mapear tudo
const inputCep = document.getElementById('js-input-cep');
const btnBuscarCep = document.getElementById('js-btn-buscar-cep');

const inputCepDados = document.getElementById('js-input-cep-dados');
const inputBairro = document.getElementById('js-input-bairro');
const inputLogradouro = document.getElementById('js-input-logradouro');
const inputEstado = document.getElementById('js-input-estado');

const areaDados = document.getElementById('js-dados');
const msgErro = document.getElementById('js-error');

btnBuscarCep.addEventListener('click', () => {
    const cepFormatado = inputCep.value.replace(/-/g, ''); // Remove hífens do CEP

    if (cepFormatado === "") {
        // Se o campo CEP estiver vazio
        msgErro.textContent = "Por favor, digite algum CEP.";
        msgErro.style.display = 'block';
        areaDados.style.display = 'none';  // Esconde a área de dados
    } else {
        fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)
        .then(response => response.json())
        .then(json => {
            if (json.erro) {
                // Se a API retornar erro (CEP não encontrado)
                msgErro.textContent = "CEP não existe.";
                msgErro.style.display = 'block';
                areaDados.style.display = 'none';
            } else {
                // Se dados forem retornados corretamente pela API
                inputCepDados.value = json.cep || "Não possui";
                inputBairro.value = json.bairro || "Não possui";
                inputLogradouro.value = json.logradouro || "Não possui";
                inputEstado.value = json.uf || "Não possui";
                areaDados.style.display = 'block';
                msgErro.style.display = 'none'; // Esconde a mensagem de erro
            }
        })
        .catch(error => {
            // Tratamento de erro de rede ou de resposta da API
            msgErro.textContent = "Erro ao buscar informações do CEP.";
            msgErro.style.display = 'block';
            areaDados.style.display = 'none';
        });
    }
});
