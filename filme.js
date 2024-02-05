const filmes = []


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

  filmes.push(filme)

  localStorage.setItem("filmes", JSON.stringify(filmes))
}

