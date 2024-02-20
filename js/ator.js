const atores = JSON.parse(localStorage.getItem("atores")) || [];

// MODAL
function abrirModal(carregarModal) {
  let modal = document.getElementById(carregarModal);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function fecharModal(fecharModal) {
  let modal = document.getElementById(fecharModal);
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// ADICIONAR OS EVENTOS
addEventListener("DOMContentLoaded", (event) => {
  const listaAtoresContainer = document.querySelector(".lista");
  const listaAtores = JSON.parse(localStorage.getItem("atores")) || [];

  listaAtores.forEach(function (ator) {
    const divAtor = document.createElement("div");
    divAtor.classList.add("lista_atores");

    divAtor.innerHTML = `
        <div class="lista_famosos">
            <img class="lista_famosos_foto" src="${ator.imagem}">
            <div class="lista_text">
                <div class="lista_alinhar">
                    <p class="lista_text_nome">${ator.nome}</p>
                    <button class="btn_abrir_modal btn_editar" onclick='editarAtor("${ator.id}")'>
                        <img src="/Imagens/icon_edit.svg" class="botao_edit">
                    </button>
                    <button class="btn_abrir_modal">
                        <img src="/Imagens/icon_delete.svg" class="botao_excluir">
                    </button>
                </div>
                <p class="lista_text_trabalhos">${ator.trabalhos}</p>
            </div>
        </div>
        <p class="lista_text_biografia">${ator.biografia}</p>
        <hr class="linha" style="width: 90%; margin: 25px auto; border-color: #8758ff;">
    `;

    listaAtoresContainer.appendChild(divAtor);
  });

  fecharModal("vis-modal");
});

// BOTAO SALVAR
function salvar() {
  const nome = document.getElementById("nome").value;
  const trabalhos = document.getElementById("trabalhos").value;
  const biografia = document.getElementById("biografia").value;
  const inputImagem = document.getElementById("modal_file");
  const imagemFile = inputImagem.files[0];

  const reader = new FileReader();

  reader.onload = function (e) {
    const imagemBase64 = e.target.result;

    const ator = {
      nome: nome,
      trabalhos: trabalhos,
      biografia: biografia,
      imagem: imagemBase64,
      id: crypto.randomUUID(),
    };

    atores.push(ator);
    localStorage.setItem("atores", JSON.stringify(atores));

    document.getElementById("nome").value = "";
    document.getElementById("trabalhos").value = "";
    document.getElementById("biografia").value = "";
    inputImagem.value = "";

    location.reload();
  };

  reader.readAsDataURL(new Blob([imagemFile]));
}

// BOTAO EDITAR
function editarAtor(id) {
  const atores = JSON.parse(localStorage.getItem("atores")) || [];
  const found = atores.find((ator) => ator.id === id);

  if (found) {
    abrirModal("vis-modal");
  }

  document.getElementById("nome").value = found.nome;
  document.getElementById("trabalhos").value = found.trabalhos;
  documento.getElementById("biografia").value = found.biografia;

  const buttonEnviar = document.getElementById("salvo");
  buttonEnviar.onclick = function () {
    salvarEdicao(id, found);
  };
}
