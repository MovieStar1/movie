const filmes = [];

function salvar() {
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;
  const sinopse = document.getElementById("sinopse").value;
  const imagem = document.getElementById("modal_file").value;

  const filme = {
    titulo: titulo,
    genero: genero,
    sinopse: sinopse,
    imagem: imagem,
  };

  filmes.push(filme);

  localStorage.setItem("filmes", JSON.stringify(filmes));
}

function listar() {
  const filmesSalvos = JSON.parse(localStorage.getItem("filmes"));
  
  const listaHTML = filmesSalvos.map((element) => {
    return `
      <div class="lista_filmes">
        <div class="lista_filmes_um"></div>
        <img class="img_poster" src="${element.modal_file}" />
        <div class="text_container">
          <p class="lista_titulos">${element.titulo}</p>
          <p class="lista_titulos_p">${element.sinopse}</p>
          <img class="icon_fav" src="/Imagens/icon_fa v.png" />
        </div>
      </div>
    `;
  });

  document.querySelector(".lista").innerHTML = listaHTML.join("");
  console.log(filmesSalvos);
}

