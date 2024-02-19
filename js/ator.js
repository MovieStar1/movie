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

addEventListener('DOMContentLoaded', (event) => {
    const listaAtoresContainer = document.querySelector(".lista");
    const listaAtores = JSON.parse(localStorage.getItem("atores")) || [];

    listaAtores.forEach(function (ator) {
        const divAtor = document.createElement("div");
        divAtor.classList.add("lista_atores") ;

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
    })
})

function salvar()