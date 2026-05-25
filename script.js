const API = "http://172.26.88.53:300";

async function cadastrarChamado() {

    const nome =
        document.getElementById("nome").value;

    const setor =
        document.getElementById("setor").value;

    const solicitacao =
        document.getElementById("solicitacao").value;

    console.log(nome);
    console.log(setor);
    console.log(solicitacao);

    const resposta = await fetch(`${API}/chamados`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome,
            setor,
            solicitacao
        })
    });

    console.log(resposta);

    listarChamados();
}

async function listarChamados() {

    const resposta =
        await fetch(`${API}/chamados`);

    const dados = await resposta.json();

    console.log(dados);

    const lista =
        document.getElementById("lista");

    lista.innerHTML = "";

    dados.forEach((item) => {

        lista.innerHTML += `
            <div class="chamado">

                <h3>${item.nome}</h3>

                <p>
                    <strong>Setor:</strong>
                    ${item.setor}
                </p>

                <p>${item.solicitacao}</p>

            </div>
        `;
    });
}

listarChamados();