const filmes = []

function preencherDropdown() {
  const listaOpcoes = document.querySelector('.form_opcao');

  const opcoesGenero = ['ação','animação','Aventura','Comédia','Documentário','Drama','Fantasia','Ficção Científica','Guerra','Romance','Suspense','Terror'];

  opcoesGenero.forEach(function(opcao) {
    var opcFilme = document.createElement('option')
    opcFilme.innerText = opcao
    opcFilme.value = opcao

    listaOpcoes.appendChild(opcFilme);
  })
}


document.addEventListener('DOMContentLoaded', function() {
  preencherDropdown();

  var listaFilmesContainer = document.querySelector('.lista');
  
  
  var listaFilmes = JSON.parse(localStorage.getItem('filmes')) || [];

  listaFilmes.forEach(function(filme) {
    var divFilme = document.createElement('div');
    divFilme.classList.add('lista_filmes');

    divFilme.innerHTML = `
      <div class="lista_filmes_um"></div>
      <img class="img_poster" src="${filme.imagem}" />
      <div class="text_container">
        <p class="lista_titulos">${filme.titulo}</p>
        <p class="lista_titulos_p">${filme.genero}</p>
        <p class="lista_titulos_p">${filme.sinopse}</p>
        <img class="icon_fav" src="/Imagens/icon_fav.png" />
      </div>
    `;

    listaFilmesContainer.appendChild(divFilme);
  });
  
});


function salvar() {
  
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;
  const sinopse = document.getElementById("sinopse").value;
  const inputImagem = document.getElementById('modal_file');
  const imagemFile = inputImagem.files[0];
  
  const reader = new FileReader();

  reader.onload = function (e) {
    const imagemBase = e.target.result;
 

  const filme = {
    titulo: titulo,
    genero: genero,
    sinopse: sinopse,
    imagem: imagemBase,
  };

  filmes.push(filme)

  localStorage.setItem("filmes", JSON.stringify(filmes))

  document.getElementById("titulo").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("sinopse").value = "";
    inputImagem.value = "";
  }
  reader.readAsDataURL(new Blob([imagemFile]));
}
