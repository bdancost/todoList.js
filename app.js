"use strict";

let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}/>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}/>
  `;

  document.getElementById("todoList").appendChild(item);
};

const limparTarefas = () => {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const atualizarTela = () => {
  limparTarefas();
  const banco = getBanco();
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
};

// Verifica se a tarefa já existe no banco
const tarefaExiste = (texto) => {
  const banco = getBanco();
  return banco.some(
    (item) => item.tarefa.toLowerCase() === texto.toLowerCase()
  );
};

const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value.trim(); //Remove espaços em branco do início e do fim
  if (tecla === "Enter" && texto) {
    if (tarefaExiste(texto)) {
      alert("Essa tareja já existe! Por Favor, insira uma nova tarefa.");
    } else {
      const banco = getBanco();
      banco.push({ tarefa: texto, status: "" });
      setBanco(banco);
      atualizarTela();
    }
    evento.target.value = ""; // Limpa o campo de entrada
  }
};

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  atualizarTela();
};
const atualizarItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === "" ? "checked" : "";
  setBanco(banco);
  atualizarTela();
};
const clickItem = (evento) => {
  const elemento = evento.target;
  console.log(elemento.type);
  if (elemento.type === "button") {
    const indice = elemento.dataset.indice;
    removerItem(indice);
  } else if (elemento.type === "checkbox") {
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
};

// Adiciona eventos aos elementos
document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);

atualizarTela();
