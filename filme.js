const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

function abrirModal(carregarModal) {
  console.log("Carregar a janela modal:" + carregarModal);

  let modal = document.getElementById(carregarModal)

  modal.style.display = 'block';

  document.body.style.overflow = 'hidden';
}

function fecharModal(fecharModal) {
  let modal = document.getElementById(fecharModal)

    modal.style.display = 'none';

 
    document.body.style.overflow = 'auto';
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
        <p class="lista_titulos">${filme.titulo}</p>
        <p class="lista_titulos_p">${filme.genero}</p>
        <p class="lista_titulos_p">${filme.sinopse}</p>
        <img class="icon_fav" src="/Imagens/icon_fav.png" />
        <button onclick='editarFilme("${filme.id}")'>Editar</button>
        <button onclick='excluir("${filme.id}")'>Excluir</button>
      </div>
    `;

    listaFilmesContainer.appendChild(divFilme);
  });
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
  const titulo = document.getElementById('titulo').value;
  const genero = document.getElementById('genero').value;
  const sinopse = document.getElementById('sinopse').value;

  const filmeIndex = filmes.findIndex((filme) => filme.id === id);

  if (filmeIndex !== -1) {
    filmes[filmeIndex] = {
      id: id,
      titulo: titulo,
      genero: genero,
      sinopse: sinopse,
      imagem: filmeOriginal.imagem, // Usar a imagem original
    };

    localStorage.setItem('filmes', JSON.stringify(filmes));

    fecharModal('vis-modal');
    location.reload(); // Recarregar a página ou atualizar a exibição dos filmes
  }
}



function excluir(id) {
  const filtrado = filmes.filter(function (filme) {
    return id !== filme.id;
  });

  localStorage.setItem("filmes", JSON.stringify(filtrado));
  location.reload();
}









