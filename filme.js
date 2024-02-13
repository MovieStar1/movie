const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

function abrirModal(carregarModal) {
  let modal = document.getElementById(carregarModal);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  console.log("Modal aberto: " + carregarModal);
}

function fecharModal(fecharModal) {
  let modal = document.getElementById(fecharModal);
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function preencherDropdown() {
  const listaOpcoes = document.querySelector(".form_opcao");

  const opcoesGenero = [
    "Ação",
    "Animação",
    "Aventura",
    "Comédia",
    "Documentário",
    "Drama",
    "Fantasia",
    "Ficção Científica",
    "Guerra",
    "Romance",
    "Suspense",
    "Terror",
  ];

  opcoesGenero.forEach(function (opcao) {
    const opcFilme = document.createElement("option");
    opcFilme.innerText = opcao;
    opcFilme.value = opcao;

    listaOpcoes.appendChild(opcFilme);
  });
}

addEventListener("DOMContentLoaded", (event) => {
  preencherDropdown();

  const listaFilmesContainer = document.querySelector(".lista");

  const listaFilmes = JSON.parse(localStorage.getItem("filmes")) || [];

  listaFilmes.forEach(function (filme) {
    const divFilme = document.createElement("div");
    divFilme.classList.add("lista_filmes");

    divFilme.innerHTML = `
      <div class="lista_filmes_um"></div>
      <img class="img_poster" src="${filme.imagem}" />
      <div class="text_container">

        <div class="alinhar">
          <p class="lista_titulos">${filme.titulo}</p>
          <button class="btn_fav" onclick='clicarFavorito("${filme.id}")'>
                <img src="/Imagens/icon_favorite_1.svg" class="botao_favorite" id="estrela-${filme.id}">
          </button>
          </div>

        <p class="lista_titulos_p">${filme.genero}</p>
        <p class="lista_titulos_p">${filme.sinopse}</p>
        <div class="btn_acao">
            <button class="btn_abrir_modal btn_editar" data-id="${filme.id}">
                <img src="/Imagens/icon_edit.svg" class="botao_edit">
            </button>

            <button class="btn_abrir_modal" onclick='excluir("${filme.id}")'>
              <img src="/Imagens/icon_delete.svg" class="botao_delete">
            </button>
          </div>
      </div>
    `;

    listaFilmesContainer.appendChild(divFilme);
  });

  // Adicionamos um código que fecha o modal automaticamente após o carregamento da página
  fecharModal('vis-modal');

  // Adicionamos um único evento de clique aos botões "Editar"
  const btnsEditar = document.querySelectorAll(".btn_editar");
  btnsEditar.forEach(function (btnEditar) {
    btnEditar.addEventListener("click", function () {
      const filmeId = btnEditar.getAttribute("data-id");
      editarFilme(filmeId);
    });
  });

  
});

// Adicionamos um único evento de clique ao botão "Adicionar"
const btnAdicionar = document.querySelector(".btn_abrir_modal");
btnAdicionar.addEventListener("click", function () {
  abrirModal('vis-modal');
});



function salvar() {
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;
  const sinopse = document.getElementById("sinopse").value;
  const inputImagem = document.getElementById("modal_file");
  const imagemFile = inputImagem.files[0];

  const reader = new FileReader();

  reader.onload = function (e) {
    const imagemBase64 = e.target.result;

    const filme = {
      titulo: titulo,
      genero: genero,
      sinopse: sinopse,
      imagem: imagemBase64,
      id: crypto.randomUUID(),
      favorite: false,
    };

    filmes.push(filme);
    localStorage.setItem("filmes", JSON.stringify(filmes));

    document.getElementById("titulo").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("sinopse").value = "";
    inputImagem.value = "";

    location.reload();
  };

  reader.readAsDataURL(new Blob([imagemFile]));
}

function editarFilme (id) {
  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  const found = filmes.find(filme => filme.id === id);
  console.log(found)

  if (found) {
    abrirModal('vis-modal');
  }

  document.getElementById('titulo').value = found.titulo;
  document.getElementById('genero').value = found.genero;
  document.getElementById('sinopse').value = found.sinopse;
  
  const buttonEnviar = document.getElementById('salvo');
    buttonEnviar.onclick = function() {
      salvarEdicao(id, found);
    }
}

function salvarEdicao(id, filmeOriginal) {
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;
  const sinopse = document.getElementById("sinopse").value;

  const filmeIndex = filmes.findIndex((filme) => filme.id === id);

  if (filmeIndex !== -1) {
    filmes[filmeIndex] = {
      id: id,
      titulo: titulo,
      genero: genero,
      sinopse: sinopse,
      imagem: filmeOriginal.imagem,
    };

    localStorage.setItem("filmes", JSON.stringify(filmes));

    fecharModal("vis-modal"); // Adicione esta linha para fechar o modal
    location.reload();
  }
}

function excluir(id) {
  const filtrado = filmes.filter(function (filme) {
    return id !== filme.id;
  });

  localStorage.setItem("filmes", JSON.stringify(filtrado));
  location.reload();
}

function clicarFavorito(id) {
  const filmeIndex = filmes.findIndex((filme) => filme.id === id);

  if (filmeIndex !== -1) {
    filmes[filmeIndex].favorite = !filmes[filmeIndex].favorite;

    localStorage.setItem("filmes", JSON.stringify(filmes));

    atualizarEstrela(id);
  }
}

function atualizarEstrela(id) {
  const filmeIndex = filmes.findIndex((filme) => filme.id === id);
  const estrela = document.getElementById(`estrela-${id}`);

  if (filmeIndex !== -1 && estrela) {
    if (filmes[filmeIndex].favorite) {
      estrela.src = "/Imagens/icon_favorite_2.svg";
    } else {
      estrela.src = "/Imagens/icon_favorite_1.svg"
    }
  }
}