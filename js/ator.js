const atores = JSON.parse(localStorage.getItem("atores")) || [];

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

addEventListener("DOMContentLoaded", (event) => {
  const listaAtoresContainer = document.querySelector(".lista");
  const listaAtores = JSON.parse(localStorage.getItem("atores")) || [];

  listaAtores.forEach(function (ator) {
    const divAtor = document.createElement("div");
    divAtor.classList.add("lista_atores");

    divAtor.innerHTML = `
            <div class="lista_famosos">
                <div class="lista_famosos_foto"></div>

                <div class="lista_text">
                    <div class="lista_alinhar">
                        <p class="lista_text_nome">Chris Evans</p>
                        <button class="btn_editar"></button>
                    </div>
                    <p class="lista_text_trabalhos">Agente Oculto, Capitão América, Máfia da Dor</p>
                </div>
                
            </div>
            <p class="lista_text_biografia">Chris Evans nasceu o 13 de junho de 1981 em Boston, Massachusetts, EUA. É ator e produtor, conhecido pelo seu trabalho em The Avengers - Os Vingadores (2012), Capitão América: O Primeiro Vingador (2011) e Capitão América: Guerra Civil (2016). É casado com Alba Baptista.</p>
            
            <hr  class="linha" style="width: 90%; margin: 25px auto; border-color: #8758ff;">
        `;

    listaAtoresContainer.appendChild(divAtor);
  });
});

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
