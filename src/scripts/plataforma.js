let historicoStorage = [];

const registroEntradaFormElements = {
  data: document.getElementById("data-entrada"),
  valor: document.getElementById("valor-entrada"),
  descricao: document.getElementById("descricao-entrada"),
  salvarBtn: document.getElementById("salvar-entrada"),
};

const registroSaidaFormElements = {
  data: document.getElementById("data-saida"),
  valor: document.getElementById("valor-saida"),
  descricao: document.getElementById("descricao-saida"),
  salvarBtn: document.getElementById("salvar-saida"),
};

const criarHistoricoStorage = () => {
  const isHistoricoStorageCreated = localStorage.getItem("historico");
  if (!isHistoricoStorageCreated)
    localStorage.setItem("historico", JSON.stringify([]));
  else {
    historicoStorage = JSON.parse(isHistoricoStorageCreated);
    adicionarHistoricoHtml();
  }
};

const adicionarLocalStorage = (tipo) => {
  const novoRegistro = {
    data: "",
    valor: "",
    descricao: "",
    tipo: "",
  };

  if (tipo === "entrada") {
    novoRegistro.data = registroEntradaFormElements.data.value;
    novoRegistro.valor = registroEntradaFormElements.valor.value;
    novoRegistro.descricao = registroEntradaFormElements.descricao.value;
    novoRegistro.tipo = tipo;
  } else if (tipo === "saida") {
    novoRegistro.data = registroSaidaFormElements.data.value;
    novoRegistro.valor = registroSaidaFormElements.valor.value;
    novoRegistro.descricao = registroSaidaFormElements.descricao.value;
    novoRegistro.tipo = tipo;
  }

  historicoStorage.unshift(novoRegistro);

  localStorage.setItem("historico", JSON.stringify(historicoStorage));

  criarHistoricoStorage();
};

const excluirLocalStorage = (index) => {
  historicoStorage.splice(index, 1);

  localStorage.setItem("historico", JSON.stringify(historicoStorage));

  const tbodyHtml = document.querySelector("tbody");
  tbodyHtml.remove();

  criarHistoricoStorage();
};

const adicionarHistoricoHtml = () => {
  const tableHtml = document.querySelector("table");
  const tbodyHtml = document.createElement("tbody");
  tableHtml.appendChild(tbodyHtml);
  historicoStorage.forEach((transacao, index) => {
    const tableRow = document.createElement("tr");

    const tableDataData = document.createElement("td");
    tableDataData.textContent = transacao.data;

    const tableDataTipo = document.createElement("td");
    tableDataTipo.textContent = transacao.tipo;

    const tableDataDescricao = document.createElement("td");
    tableDataDescricao.textContent = transacao.descricao;

    const tableDataValor = document.createElement("td");
    tableDataValor.textContent = transacao.valor;
    tableDataValor.setAttribute(
      "class",
      transacao.tipo === "entrada" ? "entrada" : "saida"
    );

    const tableDataDeletar = document.createElement("td");
    const deletarIcon = document.createElement("img");
    deletarIcon.setAttribute("src", "/src/assets/lixo.png");
    deletarIcon.setAttribute("class", "img_lixo");
    deletarIcon.setAttribute("onclick", `excluirLocalStorage(${index})`);
    tableDataDeletar.appendChild(deletarIcon);

    tableRow.appendChild(tableDataData);
    tableRow.appendChild(tableDataTipo);
    tableRow.appendChild(tableDataDescricao);
    tableRow.appendChild(tableDataValor);
    tableRow.appendChild(tableDataDeletar);

    tbodyHtml.appendChild(tableRow);
  });
};

criarHistoricoStorage();
