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

// Mudando visibilidade da confirmação para posteriormente usar
confirmacao_text("hidden", "test");

// Botão STOP
btn_stop.addEventListener("click", reset);

// Botão PAUSE
btn_pause.addEventListener("click", function () {
  return;
});

// Botão PLAY
btn_play.addEventListener("click", function () {
  if (radio_em.checked) {
    let validado = validar();
    if (validado) {
      confirmacao_text("visible", "Seu despertador irá tocar em: ");
    } else {
      confirmacao_text(
        "visible",
        "Valor inválido, por favor digite um valor válido!",
        "red"
      );
    }
  } else if (radio_as.checked) {
    let validado = validar();
    if (validado) {
      let horas = !!hora_input.value ? hora_input.value.padStart(2, "0") : `00`;
      let minutos = !!minuto_input.value
        ? minuto_input.value.padStart(2, "0")
        : `00`;
      let segundos = !!segundo_input.value
        ? segundo_input.value.padStart(2, "0")
        : `00`;
      confirmacao_text(
        "visible",
        `Seu despertador irá tocar as ${horas}:${minutos}:${segundos} em: `
      );
    } else {
      confirmacao_text(
        "visible",
        "Valor inválido, por favor digite um valor válido!",
        "red"
      );
    }
  }
});
