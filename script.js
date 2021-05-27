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
const btn_pause = document.querySelector(`#pause`);
const btn_play = document.querySelector(`#play`);

// Mudando visibilidade da confirmação para posteriormente usar
confirmacao.style.visibility = `hidden`;

// Função de reset do despertador
function reset() {
  hora_restante.textContent = "00";
  minuto_restante.textContent = "00";
  segundo_restante.textContent = "00";
}

reset();

// Botão STOP
btn_stop.addEventListener("click", reset);

// Botão PAUSE
btn_pause.addEventListener("click", function () {
  return
});

// Botão PLAY
btn_play.addEventListener("click", function () {
  if (radio_em.checked) {
    if (hora_input.value && minuto_input.value && segundo_input.value) {
      confirmacao.style.visibility = "visible";
      confirmacao.textContent = `Validado`;
    } else {
      confirmacao.style.visibility = "visible";
      confirmacao.textContent = `Invalidado`;
    }
  } else if (radio_as.checked) {
    
  }
});
