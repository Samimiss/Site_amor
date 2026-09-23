/* =========================================================
   CONFIGURAÇÃO
========================================================= */

// Data em que a história começou
const DATA_INICIO = new Date("2025-11-01T00:00:00");


/* =========================================================
   MESES
========================================================= */

const meses = [
    {
        numero: "01",
        nome: "NOVEMBRO",
        ano: "2025",
        titulo: "Onde tudo começou 🕷️"
    },
    {
        numero: "02",
        nome: "DEZEMBRO",
        ano: "2025",
        titulo: "Nosso primeiro dezembro ❤️"
    },
    {
        numero: "03",
        nome: "JANEIRO",
        ano: "2026",
        titulo: "Um novo ano, nós duas"
    },
    {
        numero: "04",
        nome: "FEVEREIRO",
        ano: "2026",
        titulo: "Mais um capítulo da nossa história"
    },
    {
        numero: "05",
        nome: "MARÇO",
        ano: "2026",
        titulo: "Nós contra o mundo 🕷️"
    },
    {
        numero: "06",
        nome: "ABRIL",
        ano: "2026",
        titulo: "Mais memórias ❤️"
    },
    {
        numero: "07",
        nome: "MAIO",
        ano: "2026",
        titulo: "Nosso mês"
    },
    {
        numero: "08",
        nome: "JUNHO",
        ano: "2026",
        titulo: "Mais um mês ao seu lado ❤️"
    },
    {
        numero: "09",
        nome: "JULHO",
        ano: "2026",
        titulo: "Você e eu 🕷️"
    },
    {
        numero: "10",
        nome: "AGOSTO",
        ano: "2026",
        titulo: "Mais uma memória"
    },
    {
        numero: "11",
        nome: "SETEMBRO",
        ano: "2026",
        titulo: "Até aqui, nós ❤️"
    },
    {
        numero: "12",
        nome: "OUTUBRO",
        ano: "2026",
        titulo: "Quase chegando ao nosso aniversário"
    },
    {
        numero: "13",
        nome: "NOVEMBRO",
        ano: "2026",
        titulo: "E a nossa história continua... ❤️"
    }
];


/* =========================================================
   INICIALIZAÇÃO DO SITE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* --- ENTRAR NO SITE --- */
    const entrarBtn = document.getElementById("entrarBtn");
    const intro = document.getElementById("intro");
    const site = document.getElementById("site");

    if (entrarBtn && intro && site) {
        entrarBtn.addEventListener("click", function () {
            intro.classList.add("saindo");

            setTimeout(function () {
                intro.style.display = "none";
                site.classList.remove("site-escondido");
                site.classList.add("site-visivel");
                window.scrollTo(0, 0);
            }, 800);
        });
    }

    /* --- BOTÃO SURPRESA --- */
    const surpresaBtn = document.getElementById("surpresaBtn");
    const surpresa = document.getElementById("surpresa");

    if (surpresaBtn && surpresa) {
        surpresaBtn.addEventListener("click", function () {
            surpresa.classList.toggle("mostrar");

            if (surpresa.classList.contains("mostrar")) {
                surpresaBtn.innerText = "❤️ EU TE AMO ❤️";
            } else {
                surpresaBtn.innerText = "CLIQUE AQUI";
            }
        });
    }

    /* --- INICIAR MÓDULOS --- */
    criarCapitulos();
    calcularTempo();
    setInterval(calcularTempo, 1000);
});


/* =========================================================
   CRIAR CAPÍTULOS
========================================================= */

function criarCapitulos() {
    const timeline = document.getElementById("timeline");
    if (!timeline) return;

    timeline.innerHTML = "";

    meses.forEach(function (mes, indice) {
        const capitulo = document.createElement("article");
        capitulo.className = "capitulo";

        capitulo.innerHTML = `
            <div class="numero-capitulo">${mes.numero}</div>
            <div class="capitulo-conteudo">
                <div class="capitulo-data">${mes.nome} • ${mes.ano}</div>
                <h3>${mes.titulo}</h3>
                <div class="fotos">
                    ${criarFoto(indice, 1)}
                    ${criarFoto(indice, 2)}
                    ${criarFoto(indice, 3)}
                </div>
                <div class="memoria" contenteditable="true" data-memoria="${indice}">
                    Escreva aqui uma lembrança especial desse mês...
                </div>
            </div>
        `;

        timeline.appendChild(capitulo);
    });

    carregarDados();
    ativarFotos();
    ativarMemorias();
    observarCapitulos();
}


/* =========================================================
   CRIAR ESPAÇO DE FOTO
========================================================= */

function criarFoto(mes, numero) {
    const chave = `foto-${mes}-${numero}`;

    return `
        <label class="foto-box" data-chave="${chave}">
            <input type="file" accept="image/*">
            <div class="foto-placeholder">
                <strong>+</strong>
                ADICIONAR FOTO
            </div>
        </label>
    `;
}


/* =========================================================
   FOTOS
========================================================= */

function ativarFotos() {
    const inputs = document.querySelectorAll(".foto-box input");

    inputs.forEach(function (input) {
        input.addEventListener("change", function () {
            const arquivo = input.files[0];
            if (!arquivo) return;

            const leitor = new FileReader();

            leitor.onload = function (evento) {
                const imagem = evento.target.result;
                const box = input.closest(".foto-box");

                salvarDados(box.dataset.chave, imagem);
                mostrarFoto(box, imagem);
            };

            leitor.readAsDataURL(arquivo);
        });
    });
}


/* =========================================================
   MOSTRAR FOTO
========================================================= */

function mostrarFoto(box, imagem) {
    const placeholder = box.querySelector(".foto-placeholder");
    if (placeholder) placeholder.style.display = "none";

    const imagemExistente = box.querySelector("img");
    if (imagemExistente) {
        imagemExistente.src = imagem;
        return;
    }

    const img = document.createElement("img");
    img.src = imagem;
    box.appendChild(img);

    const botao = document.createElement("button");
    botao.className = "foto-remover";
    botao.type = "button";
    botao.innerText = "×";
    botao.title = "Remover foto";

    botao.addEventListener("click", function (evento) {
        evento.preventDefault();
        evento.stopPropagation();
        removerFoto(box);
    });

    box.appendChild(botao);
}


/* =========================================================
   REMOVER FOTO
========================================================= */

function removerFoto(box) {
    const chave = box.dataset.chave;
    localStorage.removeItem(chave);

    const imagem = box.querySelector("img");
    const botao = box.querySelector(".foto-remover");

    if (imagem) imagem.remove();
    if (botao) botao.remove();

    const placeholder = box.querySelector(".foto-placeholder");
    if (placeholder) placeholder.style.display = "block";
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function salvarDados(chave, valor) {
    try {
        localStorage.setItem(chave, valor);
    } catch (erro) {
        alert("A foto é muito grande para ser salva no navegador. Tente uma imagem menor.");
    }
}


/* =========================================================
   CARREGAR FOTOS E MEMÓRIAS
========================================================= */

function carregarDados() {
    document.querySelectorAll(".foto-box").forEach(function (box) {
        const imagem = localStorage.getItem(box.dataset.chave);
        if (imagem) {
            mostrarFoto(box, imagem);
        }
    });

    document.querySelectorAll(".memoria").forEach(function (campo) {
        const chave = campo.dataset.memoria;
        const texto = localStorage.getItem(`memoria-${chave}`);
        if (texto) {
            campo.innerText = texto;
        }
    });
}


/* =========================================================
   MEMÓRIAS
========================================================= */

function ativarMemorias() {
    const campos = document.querySelectorAll(".memoria");

    campos.forEach(function (campo) {
        campo.addEventListener("input", function () {
            localStorage.setItem(
                `memoria-${campo.dataset.memoria}`,
                campo.innerText
            );
        });
    });
}


/* =========================================================
   CONTADOR DA NOSSA HISTÓRIA
========================================================= */

function calcularTempo() {
    const agora = new Date();

    if (agora < DATA_INICIO) return;

    let anos = agora.getFullYear() - DATA_INICIO.getFullYear();
    let meses = agora.getMonth() - DATA_INICIO.getMonth();
    let dias = agora.getDate() - DATA_INICIO.getDate();

    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            0
        ).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    let dataBase = new Date(DATA_INICIO);
    dataBase.setFullYear(DATA_INICIO.getFullYear() + anos);
    dataBase.setMonth(DATA_INICIO.getMonth() + meses);
    dataBase.setDate(DATA_INICIO.getDate() + dias);

    let diferenca = agora - dataBase;

    let horas = Math.floor(diferenca / 1000 / 60 / 60);
    let minutos = Math.floor(diferenca / 1000 / 60) % 60;
    let segundos = Math.floor(diferenca / 1000) % 60;

    const elAnos = document.getElementById("anos");
    const elMeses = document.getElementById("meses");
    const elDias = document.getElementById("dias");
    const elHoras = document.getElementById("horas");
    const elMinutos = document.getElementById("minutos");
    const elSegundos = document.getElementById("segundos");

    if (elAnos) elAnos.textContent = anos;
    if (elMeses) elMeses.textContent = meses;
    if (elDias) elDias.textContent = dias;
    if (elHoras) elHoras.textContent = String(horas).padStart(2, "0");
    if (elMinutos) elMinutos.textContent = String(minutos).padStart(2, "0");
    if (elSegundos) elSegundos.textContent = String(segundos).padStart(2, "0");
}


/* =========================================================
   ANIMAÇÃO DOS CAPÍTULOS
========================================================= */

function observarCapitulos() {
    const capitulos = document.querySelectorAll(".capitulo");

    const observer = new IntersectionObserver(
        function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("apareceu");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    capitulos.forEach(function (capitulo) {
        observer.observe(capitulo);
    });
}