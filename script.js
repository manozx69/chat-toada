const chatContainer = document.getElementById("chat");
const scrollAnchor = document.getElementById("scroll-anchor");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const loading = document.getElementById("loading");
const startScreen = document.getElementById("startScreen");
const bgMusic = document.getElementById("bgMusic");

const conversa = [
  { user: "Kumuã curandeiro, Yai, Kumu, Baya<br>No terreiro vão chegar", bot: "scr/1.png" },
  { user: "O Buhpó com a força Bahsese<br>Vai te curar", bot: "scr/2.png" },
  { user: "Kumuã curandeiro, Yai, Kumu, Baya<br>No terreiro vão chegar", bot: "scr/3.png" },
  { user: "O Buhpó com a força Bahsese<br>Vai te curar", bot: "scr/4.png" },
  { user: "Vai cantar, vai dançar, inalar paricá", bot: "Xamanismo No Crepúsculo Tropical.png"},
  { user: "O xamã vai lutar e acalmar o Waimansã", bot: "scr/6.png" },
  { user: "A dança no céu no Jirau Acará", bot: "scr/7.png" },
  { user: "Jararaca no Yaureté Ayã Yã", bot: "scr/8.png" },
  { user: "Do cosmo do povo Tukano vem a salvação", bot: "scr/9.png" },
  { user: "Benzedeiros de espíritos", bot: "scr/10.png" },
  { user: "Rebojo de força cósmica", bot: "scr/11.png" },
  { user: "Rezas de seres alados", bot: "scr/12.png" },
  { user: "Na corrente de vento desce a corredeira<br>Expulsa os males pro fundos da Piranheira", bot: "scr/13.png" },
  { user: "Dança, canta xamã, Bahsese", bot: "scr/14.png" },
  { user: "Faz pajelança da cura e da Fé", bot: "scr/15.png" },
  { user: "Dança, canta Tukano pajé", bot: "scr/16.png" },
  { user: "Kumuã Bahsesé", bot: "scr/17.png" },
  { user: "Dança, canta xamã, Bahsese", bot: "scr/18.png" },
  { user: "Faz pajelança da cura e da Fé", bot: "scr/19.png" },
  { user: "Dança, canta Tukano pajé", bot: "scr/20.png" },
  { user: "Kumuã Bahsesé", bot: "scr/21.png" }
];

    let passoAtual = -1;

    function scrollToBottom() {
      scrollAnchor.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    function clearTyping() {
      const typing = document.querySelector(".message.bot.typing");
      if (typing) typing.remove();
    }

    function proximaMensagem() {
      if (passoAtual >= conversa.length - 1) return;
      passoAtual++;

      const msgUser = document.createElement("div");
      msgUser.className = "message user";
      msgUser.innerHTML = `<div class="bubble text-bubble">${conversa[passoAtual].user}</div>`;
      chatContainer.insertBefore(msgUser, scrollAnchor);
      scrollToBottom();

      const typingDiv = document.createElement("div");
      typingDiv.className = "message bot typing";
      typingDiv.innerHTML = `<div class="bubble text-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
      chatContainer.insertBefore(typingDiv, scrollAnchor);
      scrollToBottom();

      setTimeout(() => {
        clearTyping();
        const msgBot = document.createElement("div");
        msgBot.className = "message bot";

        const bubble = document.createElement("div");
        bubble.className = "bubble image-bubble";

        const img = document.createElement("img");
        img.src = conversa[passoAtual].bot;
        img.alt = "Imagem resposta";
        img.className = "image-response";

        bubble.appendChild(img);
        msgBot.appendChild(bubble);
        chatContainer.insertBefore(msgBot, scrollAnchor);

        img.onload = () => scrollToBottom();

        prevBtn.disabled = false;
        nextBtn.disabled = passoAtual >= conversa.length - 1;
      }, 1200);
    }

    function mensagemAnterior() {
      if (passoAtual < 0) return;
      passoAtual--;
      atualizarChat();
    }

    function atualizarChat() {
      chatContainer.innerHTML = "";
      for (let i = 0; i <= passoAtual; i++) {
        const msgUser = document.createElement("div");
        msgUser.className = "message user";
        msgUser.innerHTML = `<div class="bubble text-bubble">${conversa[i].user}</div>`;
        chatContainer.appendChild(msgUser);

        const msgBot = document.createElement("div");
        msgBot.className = "message bot";
        msgBot.innerHTML = `<div class="bubble image-bubble"><img class="image-response" src="${conversa[i].bot}" alt="Imagem resposta"></div>`;
        chatContainer.appendChild(msgBot);
      }
      chatContainer.appendChild(scrollAnchor);
      scrollToBottom();
      prevBtn.disabled = passoAtual <= -1;
      nextBtn.disabled = passoAtual >= conversa.length - 1;
    }

    function iniciarChat() {
      startScreen.classList.add("hide");
      bgMusic.play();
      setTimeout(() => {
        startScreen.style.display = "none";
      }, 1000);
    }

    window.onload = () => {
      setTimeout(() => {
        loading.classList.add("hide");
        setTimeout(() => loading.style.display = "none", 1000);
      }, 2500);
    };

    prevBtn.addEventListener("click", mensagemAnterior);
    nextBtn.addEventListener("click", proximaMensagem);

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") proximaMensagem();
      if (e.key === "ArrowLeft") mensagemAnterior();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && startScreen.style.display !== "none") {
        iniciarChat();
      }
    });

atualizarChat();