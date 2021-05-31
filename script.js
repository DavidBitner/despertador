"use strict";

// Variaveis
const titulo = document.querySelector(".titulo");

const radio_em = document.querySelector(`#em`);
const radio_label_em = document.querySelector(`#label-em`);
const radio_as = document.querySelector(`#as`);
const radio_label_as = document.querySelector(`#label-as`);

const hora_input = document.querySelector("#hora");
const minuto_input = document.querySelector("#minuto");
const segundo_input = document.querySelector("#segundo");

const confirmacao = document.querySelector("#confirmacao");

const hora_restante = document.querySelector(".horas-left");
const minuto_restante = document.querySelector(".minutos-left");
const segundo_restante = document.querySelector(".segundos-left");

const btn_stop = document.querySelector(`#stop`);
const btn_play = document.querySelector(`#play`);

const audio = document.querySelector("#my-audio");

// Timers
let timer, piscar_fundo;

// Função de reset do despertador
function reset() {
  hora_restante.textContent = "00";
  minuto_restante.textContent = "00";
  segundo_restante.textContent = "00";
}

reset();

// Função para validar se o despertador é valido
function validar() {
  if (
    Number(hora_input.value) >= 0 &&
    Number(hora_input.value <= 23) &&
    Number(minuto_input.value >= 0) &&
    Number(minuto_input.value <= 59) &&
    Number(segundo_input.value >= 0) &&
    Number(segundo_input.value <= 59)
  ) {
    return true;
  } else {
    return false;
  }
}

// Função de confirmação
function confirmacao_text(
  visi = "visible",
  confirmacao_txt = "",
  confirmacao_cor = "#ffadb4"
) {
  if (visi == "visible") {
    confirmacao.style.visibility = visi;
    confirmacao.style.color = confirmacao_cor;
    confirmacao.textContent = confirmacao_txt;
  } else {
    confirmacao.style.visibility = "hidden";
  }
}

// Piscar fundo
function piscar() {
  let num = 0;
  const piscar_fundo = setInterval(() => {
    const cores = ["blue", "white"];

    if (num == 0) {
      num = 1;
    } else if (num == 1) {
      num = 0;
    }
    document.body.style.backgroundColor = cores[num];
  }, 200);

  return piscar_fundo;
}

// Mudando visibilidade da confirmação para posteriormente usar
confirmacao_text("hidden", "test");

// Botão STOP
btn_stop.addEventListener("click", function () {
  // Resetar despertador
  reset();
  clearInterval(timer);

  // Parar musica
  audio.pause();

  // Parar de piscar tela
  clearInterval(piscar_fundo);
  document.body.style.backgroundColor = "black";

  // Habilitar botão play
  btn_play.classList.remove("disabled-btn");
  btn_play.style.opacity = "1";
});

// Função de timer do despertador
function start_despertador(despertar) {
  function tick() {
    const hora = String(Math.trunc(time / 3600)).padStart(2, 0);
    const temp = String(Math.trunc(time % 3600)).padStart(2, 0);
    const min = String(Math.trunc(temp / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // Em cada chamada, printar o tempo restante na UI
    hora_restante.textContent = hora;
    minuto_restante.textContent = min;
    segundo_restante.textContent = sec;

    // Quando o timer atingir 0, despertar
    if (time === 0) {
      clearInterval(timer);

      // Tocar musica
      audio.play();

      // Piscar fundo
      piscar_fundo = piscar();

      // Desabilitar botão play
      btn_play.classList.add("disabled-btn");
      btn_play.style.opacity = ".2";
    }

    // Tirar 1 seg
    time--;
  }

  // Setar o timer
  let time = despertar;

  // Chamar o timer todo segundo
  tick();
  const timer = setInterval(tick, 1000);

  // Retornar o timer para reseta-lo
  return timer;
}

// Função que vai retornar tempo restante para despertar
function calcular_data(h = 0, m = 0, s = 0) {
  const agora = new Date();
  let despertar = 0;
  let diff = 0;
  const agora_hora = agora.getHours();
  const agora_min = agora.getMinutes();
  let total = 0;

  if (h > agora_hora) {
    despertar = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate(),
      h,
      m,
      s
    );
    diff = Math.abs(despertar - agora);

    total = Math.trunc(diff / 1000);
  } else if (h == agora_hora && m >= agora_min) {
    despertar = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate(),
      h,
      m,
      s
    );
    diff = Math.abs(despertar - agora);

    total = Math.trunc(diff / 1000);
  } else {
    despertar = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate() + 1,
      h,
      m,
      s
    );
    diff = Math.abs(despertar - agora);

    total = Math.trunc(diff / 1000);
  }

  return total;
}

// Botão PLAY
btn_play.addEventListener("click", function () {
  let validado = validar();
  let hora = 0;
  let minuto = 0;
  let segundo = 0;
  let total = 0;
  if (radio_em.checked) {
    if (validado) {
      confirmacao_text("visible", "Seu despertador irá tocar em: ");
      hora = Number(hora_input.value);
      minuto = Number(minuto_input.value);
      segundo = Number(segundo_input.value);
      total = (hora * 60 + minuto) * 60 + segundo;

      if (timer) {
        clearInterval(timer);
      }

      timer = start_despertador(total);
    } else {
      confirmacao_text(
        "visible",
        "Valor inválido, por favor digite um valor válido!",
        "red"
      );
    }
  } else if (radio_as.checked) {
    if (validado) {
      hora = !!hora_input.value ? hora_input.value.padStart(2, "0") : `00`;
      minuto = !!minuto_input.value
        ? minuto_input.value.padStart(2, "0")
        : `00`;
      segundo = !!segundo_input.value
        ? segundo_input.value.padStart(2, "0")
        : `00`;
      confirmacao_text(
        "visible",
        `Seu despertador irá tocar as ${hora}:${minuto}:${segundo} em: `
      );

      total = calcular_data(hora, minuto, segundo);

      if (timer) {
        clearInterval(timer);
      }

      timer = start_despertador(total);
    } else {
      confirmacao_text(
        "visible",
        "Valor inválido, por favor digite um valor válido!",
        "red"
      );
    }
  }
});
