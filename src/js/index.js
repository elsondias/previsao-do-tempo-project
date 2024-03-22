const chaveDaApi = "20788868b2194d65a05103657232911";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if (dados) preencherDadosNaTela(dados, cidade);
});

const inputDeBusca = document.getElementById("input-busca");

inputDeBusca.addEventListener("keyup", async (event) => {
    if (event.keyCode === 13) {
        const cidade = inputDeBusca.value;

        if (!cidade) return;

        const dados = await buscarDadosDaCidade(cidade);

        if (dados) preencherDadosNaTela(dados, cidade);
    }
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl);

    if (resposta.status !== 200) return;

    const dados = await resposta.json();

    return dados;
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const umidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura} ºC`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("umidade").textContent = `${umidade}%`;

    document.getElementById(
        "velocidade-do-vento"
    ).textContent = `${velocidadeDoVento} km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}

var data = new Date();
var hora = data.getHours();
var body = document.body;

if (hora >= 0 && hora < 6) {
    body.style.backgroundImage = "url('src/img/madrugada.jpg')";
} else if (hora >= 6 && hora < 12) {
    body.style.backgroundImage = "url('src/img/manha.jpg')";
} else if (hora >= 12 && hora < 18) {
    body.style.backgroundImage = "url('src/img/tarde.jpg')";
} else {
    body.style.backgroundImage = "url('src/img/noite.jpg')";
}