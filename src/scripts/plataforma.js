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
    popularDados();
  }
};

const adicionarLocalStorage = (tipo) => {
  const novoRegistro = {
    data: "",
    valor: "",
    descricao: "",
    tipo: "",
  };

  if (
    (tipo === "entrada") & (registroEntradaFormElements.data.value === "") &&
    registroEntradaFormElements.valor.value === "" &&
    registroEntradaFormElements.descricao.value === ""
  )
    return;

  if (
    (tipo === "saida") & (registroSaidaFormElements.data.value === "") &&
    registroSaidaFormElements.valor.value === "" &&
    registroSaidaFormElements.descricao.value === ""
  )
    return;

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

  novoRegistro.data = "";
  novoRegistro.valor = "";
  novoRegistro.descricao = "";
  novoRegistro.tipo = "";

  location.reload();
};

const excluirLocalStorage = (index) => {
  historicoStorage.splice(index, 1);

  localStorage.setItem("historico", JSON.stringify(historicoStorage));

  const tbodyHtml = document.querySelector(`tr[name="${index}"]`);
  tbodyHtml.remove();

  clearInputs();
  location.reload();
};

const clearInputs = () => {
  registroEntradaFormElements.data.value = "";
  registroEntradaFormElements.descricao.value = "";
  registroEntradaFormElements.valor.value = "";

  registroSaidaFormElements.data.value = "";
  registroSaidaFormElements.descricao.value = "";
  registroSaidaFormElements.valor.value = "";
};

const popularDados = () => {
  calcularHora();
  popularSaldoEntradasSaidas();
};

const popularSaldoEntradasSaidas = () => {
  const entradasArray = historicoStorage.filter(
    (transacao) => transacao.tipo === "entrada"
  );
  const saidasArray = historicoStorage.filter(
    (transacao) => transacao.tipo === "saida"
  );

  let entradasSoma = 0;
  let saidasSoma = 0;

  entradasArray.forEach((entrada) => {
    entradasSoma += parseFloat(entrada.valor);
  });
  saidasArray.forEach((saida) => {
    saidasSoma += parseFloat(saida.valor);
  });

  const saldoHtml = document.querySelector("#saldoTotal");
  const entradaHtml = document.querySelector("#entradaTotal");
  const saidaHtml = document.querySelector("#saidaTotal");

  entradaHtml.innerHTML = entradasSoma.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  saidaHtml.innerHTML = saidasSoma.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  saldoHtml.innerHTML = (entradasSoma - saidasSoma).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let imgArtigosRecomendados = document.querySelector(
    "#img-artigos-recomendados"
  );
  let linkArtigosRecomendados = document.querySelector(
    "#link-artigos-recomendados"
  );
  let nomeArtigosRecomendados = document.querySelector(
    "#name-artigos-recomendados"
  );
  let saldoTotal = entradasSoma - saidasSoma;
  if (saldoTotal < 1000) {
    imgArtigosRecomendados.src = "./assets/fontes de renda.jpg";
    linkArtigosRecomendados.href = "artigo4.html";
    nomeArtigosRecomendados.innerHTML = "Fontes de Renda";
  } else if (saldoTotal >= 1000 && saldoTotal < 10000) {
    imgArtigosRecomendados.src = "./assets/poupar-dinheiro.jpg";
    linkArtigosRecomendados.href = "artigo3.html";
    nomeArtigosRecomendados.innerHTML = "Poupar Dinheiro";
  } else if (saldoTotal >= 10000 && saldoTotal < 50000) {
    imgArtigosRecomendados.src = "./assets/investimento_image.jpg";
    linkArtigosRecomendados.href = "artigo2.html";
    nomeArtigosRecomendados.innerHTML = "Investimentos";
  } else {
    imgArtigosRecomendados.src = "./assets/gestao-financeira.jpg";
    linkArtigosRecomendados.href = "artigo1.html";
    nomeArtigosRecomendados.innerHTML = "Gestão Financeira";
  }
};

const calcularHora = () => {
  const date = new Date();
  const hour = date.getHours();
  const dateHtml = document.querySelector("#date");
  if (hour < 5) {
    dateHtml.innerHTML = "Boa Noite!";
  } else if (hour < 8) {
    dateHtml.innerHTML = "Bom Dia!";
  } else if (hour < 12) {
    dateHtml.innerHTML = "Bom Dia!";
  } else if (hour < 18) {
    dateHtml.innerHTML = "Boa tarde!";
  } else {
    dateHtml.innerHTML = "Boa noite!";
  }
};

const adicionarHistoricoHtml = () => {
  const tableHtml = document.querySelector("table");
  let tbodyHtml;
  if (document.querySelector("tbody") === null) {
    tbodyHtml = document.createElement("tbody");
  } else {
    tbodyHtml = document.querySelector("tbody");
  }
  tableHtml.appendChild(tbodyHtml);
  historicoStorage.forEach((transacao, index) => {
    if (document.querySelector(`tr[name="${index}"]`)) return;
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("name", index);

    const tableDataData = document.createElement("td");
    tableDataData.textContent = transacao.data;

    const tableDataTipo = document.createElement("td");
    tableDataTipo.setAttribute("class", "tableTipoBody");
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
    deletarIcon.setAttribute("src", "./assets/lixo.png");
    deletarIcon.setAttribute("class", "img_lixo");
    deletarIcon.setAttribute("onclick", `excluirLocalStorage(${index})`);
    tableDataDeletar.appendChild(deletarIcon);

    tableRow.appendChild(tableDataData);
    tableRow.appendChild(tableDataTipo);
    tableRow.appendChild(tableDataDescricao);
    tableRow.appendChild(tableDataValor);
    tableRow.appendChild(tableDataDeletar);

    tbodyHtml.appendChild(tableRow);

    if (transacao.tipo === "entrada")
      document.querySelector("button#closeEntradaModal").click();
    else if (transacao.tipo === "saida")
      document.querySelector("button#closeSaidaModal").click();

    clearInputs();
  });
};

criarHistoricoStorage();
